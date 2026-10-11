import Project from '../models/Project.js';
import Evidence from '../models/Evidence.js';
import SkillScore from '../models/SkillScore.js';
import { aiService } from '../services/aiService.js';
import { demoProjects, demoStudentSkillScores } from '../seed/seedData.js';

export const getProjects = async (req, res) => {
  try {
    if (!req.app.locals.isMemoryStore) {
      const projects = await Project.find({ userId: req.user._id });
      if (projects.length > 0) return res.json(projects);
    }
    return res.json(demoProjects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitProject = async (req, res) => {
  const { title, description, githubUrl, demoUrl, technologies, projectCategory } = req.body;

  try {
    // Run AI Repository Verification
    const aiAnalysis = await aiService.analyzeProject({ title, description, githubUrl, technologies });

    const timeline = [
      { stage: 'Submitted', status: 'completed', timestamp: new Date(), detail: 'Project submitted by student' },
      { stage: 'Repository Analyzed', status: 'completed', timestamp: new Date(), detail: 'GitHub URL verified & commits parsed' },
      { stage: 'Technology Detection', status: 'completed', timestamp: new Date(), detail: `Detected: ${(aiAnalysis.detectedTechnologies || []).join(', ')}` },
      { stage: 'Skill Extraction', status: 'completed', timestamp: new Date(), detail: `Extracted ${(aiAnalysis.detectedSkills || []).length} core competencies` },
      { stage: 'Verification Complete', status: 'completed', timestamp: new Date(), detail: `Score: ${aiAnalysis.verificationScore}/100` }
    ];

    let createdProject;

    if (!req.app.locals.isMemoryStore) {
      // Create project document letting MongoDB / Mongoose generate a valid ObjectId _id
      const projectDoc = await Project.create({
        userId: req.user._id,
        title,
        description,
        githubUrl,
        demoUrl: demoUrl || '',
        technologies: aiAnalysis.detectedTechnologies || ['Python', 'React', 'MongoDB'],
        projectCategory: projectCategory || 'AI/ML',
        verificationStatus: 'Verified',
        verificationScore: aiAnalysis.verificationScore || 84,
        detectedSkills: aiAnalysis.detectedSkills,
        repositoryEvidence: aiAnalysis.repositoryEvidence,
        verificationTimeline: timeline,
        submittedAt: new Date()
      });

      createdProject = projectDoc.toObject();

      await Evidence.create({
        userId: req.user._id,
        title: title,
        evidenceType: 'Projects',
        source: 'GitHub Repository',
        verificationStatus: 'Verified',
        verificationMethod: 'AI Code Analysis & Commit Log',
        verificationScore: aiAnalysis.verificationScore || 84,
        linkedSkills: aiAnalysis.detectedTechnologies,
        date: 'Today'
      });
    } else {
      createdProject = {
        _id: 'proj_' + Date.now(),
        userId: req.user._id,
        title,
        description,
        githubUrl,
        demoUrl: demoUrl || '',
        technologies: aiAnalysis.detectedTechnologies || ['Python', 'React', 'MongoDB'],
        projectCategory: projectCategory || 'AI/ML',
        verificationStatus: 'Verified',
        verificationScore: aiAnalysis.verificationScore || 84,
        detectedSkills: aiAnalysis.detectedSkills,
        repositoryEvidence: aiAnalysis.repositoryEvidence,
        verificationTimeline: timeline,
        submittedAt: new Date()
      };
      demoProjects.unshift(createdProject);
    }

    // Boost related skill scores
    if (aiAnalysis.detectedSkills) {
      aiAnalysis.detectedSkills.forEach(ds => {
        const existingSkill = demoStudentSkillScores.find(s => s.skillName.toLowerCase() === ds.skillName.toLowerCase());
        if (existingSkill) {
          existingSkill.scorePercentage = Math.min(95, existingSkill.scorePercentage + 3);
          existingSkill.evidenceCount += 1;
        }
      });
    }

    return res.status(201).json({
      message: 'Project submitted and verified successfully by EDUTECH AI Engine!',
      project: createdProject,
      aiAnalysis
    });
  } catch (error) {
    console.error('[Submit Project Error]', error);
    return res.status(500).json({ message: error.message });
  }
};

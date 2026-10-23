const { createServer } = require('../frontend/node_modules/vite');
const React = require('../frontend/node_modules/react');
const ReactDOMServer = require('../frontend/node_modules/react-dom/server');

(async () => {
  const vite = await createServer({
    root: './frontend',
    server: { middlewareMode: true }
  });

  const pages = [
    '/src/pages/LandingPage.jsx',
    '/src/pages/DashboardPage.jsx',
    '/src/pages/WorkspacePage.jsx',
    '/src/pages/SkillGapPage.jsx',
    '/src/pages/ProjectsPage.jsx',
    '/src/pages/RoadmapPage.jsx',
    '/src/pages/InternshipsPage.jsx',
    '/src/pages/InterviewPage.jsx',
    '/src/pages/DecisionLabPage.jsx',
    '/src/pages/SettingsPage.jsx',
    '/src/components/Navbar.jsx',
    '/src/components/DecisionTracePanel.jsx',
    '/src/App.jsx'
  ];

  let hasError = false;

  for (const page of pages) {
    try {
      const mod = await vite.ssrLoadModule(page);
      const Comp = mod.default;
      const html = ReactDOMServer.renderToString(React.createElement(Comp, {
        setActiveTab: () => {},
        systemStatus: { decider_2b_available: true, bedrock_configured: true },
        profile: { name: 'Alex Sharma', target_role: 'Full-Stack AI Engineer', skills: [] },
        activities: [],
        messages: [],
        onSendMessage: () => {},
        currentTrace: null
      }));
      console.log(`✅ [OK] ${page} rendered (${html.length} chars)`);
    } catch (err) {
      console.error(`❌ [ERROR] in ${page}:`, err);
      hasError = true;
    }
  }

  await vite.close();
  if (hasError) {
    process.exit(1);
  } else {
    console.log('\n🎉 ALL 13 PAGES AND COMPONENTS RENDERED SUCCESSFULLY WITH 0 ERRORS!');
  }
})();

import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile, ActivityLog
from .storage_interface import StorageInterface
from ..config import settings

class JsonStorage(StorageInterface):
    def __init__(self, data_dir: Optional[str] = None):
        self.data_dir = Path(data_dir or settings.DATA_DIR)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.profile_path = self.data_dir / "student_profile.json"
        self.roles_path = self.data_dir / "role_requirements.json"
        self.internships_path = self.data_dir / "internships.json"
        self.projects_path = self.data_dir / "projects_catalog.json"
        self.activities_path = self.data_dir / "activity_logs.json"
        self.roadmap_path = self.data_dir / "roadmaps.json"

    def _read_json(self, path: Path, default: Any) -> Any:
        if not path.exists():
            return default
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return default

    def _write_json(self, path: Path, data: Any) -> None:
        try:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"Error writing to {path}: {e}")

    def get_student_profile(self, student_id: str) -> Optional[StudentProfile]:
        data = self._read_json(self.profile_path, None)
        if data:
            return StudentProfile(**data)
        return None

    def update_student_profile(self, profile: StudentProfile) -> StudentProfile:
        self._write_json(self.profile_path, profile.model_dump())
        return profile

    def get_role_requirements(self, role: str) -> Dict[str, Any]:
        roles = self._read_json(self.roles_path, {})
        # Exact match or case-insensitive match
        for r_name, r_data in roles.items():
            if r_name.lower() == role.lower():
                return r_data
        # Fallback to closest default
        return roles.get("Full-Stack AI Engineer", {})

    def get_all_roles(self) -> List[str]:
        roles = self._read_json(self.roles_path, {})
        return list(roles.keys())

    def get_internships(
        self,
        role_filter: Optional[str] = None,
        location_filter: Optional[str] = None,
        skill_filter: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        internships = self._read_json(self.internships_path, [])
        results = []
        for item in internships:
            if role_filter and role_filter.lower() not in item.get("role_category", "").lower():
                continue
            if location_filter and location_filter.lower() not in item.get("location", "").lower():
                continue
            if skill_filter:
                item_skills = [s.lower() for s in item.get("required_skills", [])]
                if not any(f.lower() in item_skills for f in skill_filter):
                    continue
            results.append(item)
        return results

    def get_projects(
        self,
        domain_filter: Optional[str] = None,
        difficulty_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        projects = self._read_json(self.projects_path, [])
        results = []
        for p in projects:
            if domain_filter and domain_filter.lower() not in p.get("domain", "").lower():
                continue
            if difficulty_filter and difficulty_filter.lower() != p.get("difficulty", "").lower():
                continue
            results.append(p)
        return results

    def get_roadmap(self, student_id: str) -> Optional[Dict[str, Any]]:
        roadmaps = self._read_json(self.roadmap_path, {})
        return roadmaps.get(student_id)

    def save_roadmap(self, student_id: str, roadmap: Dict[str, Any]) -> Dict[str, Any]:
        roadmaps = self._read_json(self.roadmap_path, {})
        roadmaps[student_id] = roadmap
        self._write_json(self.roadmap_path, roadmaps)
        return roadmap

    def add_activity_log(self, log: ActivityLog) -> None:
        activities = self._read_json(self.activities_path, [])
        activities.insert(0, log.model_dump())
        # Keep recent 50
        activities = activities[:50]
        self._write_json(self.activities_path, activities)

    def get_recent_activities(self, limit: int = 10) -> List[ActivityLog]:
        activities = self._read_json(self.activities_path, [])
        return [ActivityLog(**a) for a in activities[:limit]]

_storage_instance: Optional[StorageInterface] = None

def get_storage() -> StorageInterface:
    global _storage_instance
    if _storage_instance is None:
        _storage_instance = JsonStorage()
    return _storage_instance

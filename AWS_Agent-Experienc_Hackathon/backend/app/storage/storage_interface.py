from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile, ActivityLog

class StorageInterface(ABC):
    @abstractmethod
    def get_student_profile(self, student_id: str) -> Optional[StudentProfile]:
        pass

    @abstractmethod
    def update_student_profile(self, profile: StudentProfile) -> StudentProfile:
        pass

    @abstractmethod
    def get_role_requirements(self, role: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_all_roles(self) -> List[str]:
        pass

    @abstractmethod
    def get_internships(
        self,
        role_filter: Optional[str] = None,
        location_filter: Optional[str] = None,
        skill_filter: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_projects(
        self,
        domain_filter: Optional[str] = None,
        difficulty_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_roadmap(self, student_id: str) -> Optional[Dict[str, Any]]:
        pass

    @abstractmethod
    def save_roadmap(self, student_id: str, roadmap: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    def add_activity_log(self, log: ActivityLog) -> None:
        pass

    @abstractmethod
    def get_recent_activities(self, limit: int = 10) -> List[ActivityLog]:
        pass

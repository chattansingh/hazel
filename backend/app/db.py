from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


def _sqlite_url(path: str) -> str:
    # Accept both relative and absolute paths, keep it simple for the MVP.
    if path.startswith("sqlite:///") or path.startswith("sqlite:////"):
        return path
    return f"sqlite:///{path}"


engine = create_engine(
    _sqlite_url(settings.sqlite_path),
    connect_args={"check_same_thread": False},
)


class Base(DeclarativeBase):
    pass


SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, class_=Session)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from backend.config import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.BLOB, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }


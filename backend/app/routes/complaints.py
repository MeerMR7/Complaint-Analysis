from fastapi import APIRouter, Depends
from app.services.predictor import predict_complaint 
from app.security import get_current_user
from app.services.predictor import predict_complaint
from app.database import SessionLocal
from app.models import ComplaintHistory, User

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)

@router.post("/predict")
def predict(
        text: str,
        current_user: str = Depends(get_current_user)):
        
     db = SessionLocal()

     prediction = predict_complaint(text)

     record = ComplaintHistory(
            user=current_user,
            text=text,
            prediction=prediction
        )

     db.add(record)

     db.commit()

     db.close()

     return {
            "user": current_user,
            "text": text,
            "prediction": prediction
        }


# history:
@router.get("/history")

def history(
    current_user: str = Depends(get_current_user)
):

    db = SessionLocal()

    data = (
        db.query(ComplaintHistory)
        .filter(
            ComplaintHistory.user == current_user
        )
        .all()
    )

    db.close()

    return data



# Dashboard : (protected route):
@router.get("/dashboard")
def dashboard(
    current_user: str = Depends(get_current_user)
):

    db = SessionLocal()

    user = db.query(User).filter(
    User.email == current_user
    ).first()

    total = db.query(
            ComplaintHistory
      ).filter(
            ComplaintHistory.user == current_user
      ).count()


    negative = db.query(
            ComplaintHistory
    ).filter(
        ComplaintHistory.user == current_user,
        ComplaintHistory.prediction == "Negative"
    ).count()


    positive = db.query(
        ComplaintHistory
    ).filter(
        ComplaintHistory.user == current_user,
        ComplaintHistory.prediction == "Positive"
    ).count()

    db.close()

    

    return {
            "user": user.username,
            "total": total,
            "positive": positive,
            "negative": negative
        }
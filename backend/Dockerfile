# Backend Dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
<<<<<<< HEAD
RUN apt-get update && apt-get install -y curl
EXPOSE 4000
CMD ["node", "app.js"]
=======
EXPOSE 4001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000"]
>>>>>>> 5326804 (front update)

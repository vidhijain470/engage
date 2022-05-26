from facenet_pytorch import MTCNN,InceptionResnetV1
import os
from pathlib import Path
from PIL import Image
import torch
from torch.nn import functional

class VisionAuthentication(object):
    
    def __init__(self,teacher_name,subject_name,roll_number):
        self.thresold = 0.35
        self.mtcnn = MTCNN() 
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.resnet = InceptionResnetV1()
        self.resnet.classify = False
        self.resnet.load_state_dict(torch.load("20180402-114759-vggface2.pt",map_location = device),strict = False)
        self.resnet.eval()
        self.teacher_name = teacher_name
        self.subject_name = subject_name 
        self.roll_number = roll_number 
    def do_authentication(self,uploaded_image_path):
        original_image_path = os.path.join("../database",self.teacher_name,self.subject_name,self.roll_number,f"{self.roll_number}.jpeg")
        original_image = Image.open(original_image_path)
        origian_image = self.mtcnn(original_image)
        origian_image_features = self.resnet(origian_image.unsqueeze(0))
        uploaded_image = Image.open(uploaded_image_path)
        uploaded_image = self.mtcnn(uploaded_image)
        if uploaded_image != None:
            uploaded_image_features = self.resnet(uploaded_image.unsqueeze(0))
            similarity = functional.cosine_similarity(origian_image_features,uploaded_image_features).cpu().item()
            if round(similarity,2) >= self.thresold:
                return (True,round(similarity,2))
            else:
                return (False,round(similarity,2))
        else:
            return (False,round(0.000,2))

# vision_authentication = VisionAuthentication("Admin1","subject","Mt20007")
# print(vision_authentication.do_authentication())
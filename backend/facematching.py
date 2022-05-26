from facenet_pytorch import MTCNN,InceptionResnetV1
import os
from pathlib import Path
from PIL import Image
import torch 
from torch.nn import functional
def get_all_image_from_db(username):
    image_path = os.path.join("../database",username)
    all_student_images = list()
    for file_name in os.listdir(image_path):
        file_name = os.path.join(image_path,file_name)
        if os.path.isfile(file_name):
            all_student_images.append(file_name)
    return all_student_images

def get_cropped_images(image_list,username):
    cropped_images_path = list()
    mtcnn = MTCNN()
    cropped_path = os.path.join("../database",username,"cropped_path")
    if not os.path.exists(cropped_path):
        os.makedirs(cropped_path)
    for image in image_list:
        image_name = Path(image).name
        cropped_image_path = os.path.join(cropped_path,image_name)
        img = Image.open(image)
        img_cropped = mtcnn(img, save_path=cropped_image_path)
        cropped_images_path.append(cropped_image_path)
    return cropped_images_path

def extract_features(gallery_images,query_image):
    resnet = InceptionResnetV1(pretrained='casia-webface').eval()
    mtcnn = MTCNN()
    with torch.no_grad():
        query_image = Image.open(query_image)
        query_image = mtcnn(query_image)
        query_image_features = resnet(query_image.unsqueeze(0))
    with torch.no_grad():
        for gallery_image_name in gallery_images:
            gallery_image = Image.open(gallery_image_name)
            gallery_image = mtcnn(gallery_image)
            gallery_image_features = resnet(gallery_image.unsqueeze(0))
            similarity = functional.cosine_similarity(query_image_features,gallery_image_features)
            print(similarity , gallery_image_name)
if __name__ == "__main__":
    username = "Admin1"
    all_student_images = get_all_image_from_db(username = username)
    #all_student_cropped_images = get_cropped_images(all_student_images,username)
    extract_features(all_student_images,"../database/Admin1/Query_image/query_image.jpeg")

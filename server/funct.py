from moviepy.editor import VideoFileClip, concatenate_videoclips
import os
import shutil


def hello(id, start, stop):



    name =(f"../client/public/clip{id}.mp4")
    print(name)

    clip1 = VideoFileClip("../client/public/video.mp4").subclip(start,stop)
    #clip2 = VideoFileClip("video.mp4").subclip(10,13)
    #clip3 = VideoFileClip("video.mp4").subclip(start,stop)



    #total = concatenate_videoclips([clip1])
    clip1.write_videofile(name)
    #x= (f"{id},{start},{stop}")

    #return x


# def playused(play):
#     x = f'play {play}added to working project'
#     running_project=VideoFileClip("../client/public/clip0.mp4").subclip(0,5)
#     clip_to_be_added=VideoFileClip(f"../client/public/clip{play}.mp4")

#     total = concatenate_videoclips([running_project,clip_to_be_added])
#     total.write_videofile("../client/public/clip0.mp4")

    x = name
    return x


    #######
def playused(play):
    if os.path.exists('../client/public/clip0.mp4'):
        os.rename('../client/public/clip0.mp4', '../client/public/buffer.mp4')
        running_project=VideoFileClip("../client/public/buffer.mp4")
        clip_to_be_added=VideoFileClip(f"../client/public/clip{play}.mp4")
        total = concatenate_videoclips([running_project,clip_to_be_added])
        total.write_videofile("../client/public/clip0.mp4")
        os.remove("../client/public/buffer.mp4")


    else:
        clip_to_be_added=VideoFileClip(f"../client/public/clip{play}.mp4")
        total = concatenate_videoclips([clip_to_be_added])
        total.write_videofile('../client/public/clip0.mp4')

        


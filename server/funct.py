from moviepy.editor import VideoFileClip, concatenate_videoclips


start = 17
stop = 21

name =("../client/public/project.mp4")

clip1 = VideoFileClip("../client/public/video.mp4").subclip(3,7)
#clip2 = VideoFileClip("video.mp4").subclip(10,13)
#clip3 = VideoFileClip("video.mp4").subclip(start,stop)



total = concatenate_videoclips([clip1])
total.write_videofile(name)

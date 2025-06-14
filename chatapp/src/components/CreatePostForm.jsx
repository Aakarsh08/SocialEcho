import React, { useState } from "react";
import {
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function CreatePostDialog({ setPosts }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post("http://localhost:7000/posts/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts(prev => [res.data.post, ...prev]);
      setContent('');
      setImage(null);
      handleOpen();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to post");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-md mb-2 border">
        <h2 className="text-lg font-semibold text-gray-800">
          Post something for your followers
        </h2>
        <Button onClick={handleOpen} variant="gradient" color="blue">
          Create Post
        </Button>
      </div>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative">
          <Typography variant="h4" color="blue-gray">
            Create New Post
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4 pb-6">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Give a nice caption for your post
              </Typography>
              <Textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share something..."
                className="!w-full"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Upload Image (Optional)
              </Typography>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="!w-full"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="submit" color="blue" className="ml-auto">
              Post
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

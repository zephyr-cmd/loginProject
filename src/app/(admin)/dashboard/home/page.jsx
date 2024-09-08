"use client";
import { Button } from "@/components/ui/button";
import { Modal, Modal1 } from "@/components/helper/Modal";
import { EditProfile } from "../../_resources/modalForm/editProfile";
import { useEffect, useState } from "react";

function Home() {
  const [currentModal, setCurrentModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [userData, setUserData] = useState([]);
  const [youTubeLink, setYouTubeLink] = useState("");
  useEffect(() => {
    async function getData() {
      try {
        const _id = localStorage.getItem("_id");
        console.log("L-18, userId------->", _id);
        let response = await fetch(`/api/v1/admin/user/${_id}`);
        let fetchedData = await response.json();
        console.log("L-21, fetchedData", fetchedData);

        if (fetchedData?.status === 200) {
          setUserData(fetchedData?.data);

          const videoId = fetchedData?.data?.youtubeLink?.split("v=")[1];
          const embedLink = videoId
            ? `https://www.youtube.com/embed/${videoId}`
            : "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"; // Replace with your default or fallback video

          setYouTubeLink(embedLink);
        }
      } catch (error) {
        console.log("L-32, something went wrong ??", error);
      }
    }

    getData();
  }, []);

  const handleEditSelection = (modalComponent) => {
    setCurrentModal(modalComponent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
    // fetchAppointments();
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Button
          variant="projectbtn1"
          onClick={() => handleEditSelection(<EditProfile />)}
        >
          Edit Profile
        </Button>
        <div className="flex flex-col items-center justify-center gap-5">
          <div> Description : {userData?.message}</div>
          {youTubeLink && (
            <iframe
              width="560"
              height="315"
              src={youTubeLink}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {currentModal}
      </Modal>
      <Modal1 isOpen={isModalOpen1} onClose={handleCloseModal}>
        {currentModal}
      </Modal1>
    </div>
  );
}

export default Home;

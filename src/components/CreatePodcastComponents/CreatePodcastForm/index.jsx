import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import "./style.css";
import FileInput from '../../common/Input/FileInput';
import { toast } from 'react-toastify';

import { db,storage,auth } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreatePodcastForm = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [bannerImg,setBannerImg] = useState(null);
    const [smallImg,setSmallImg] = useState(null);

    const [loading,setLoading] = useState(false);
    const [lableText,setLableText] = useState(false);

    async function handleSubmit(e){
      e.preventDefault();
      setLoading(true);
        if(title && description && bannerImg && smallImg){

          try {
            //Uploading Banner Image
          const bannerImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
          await uploadBytes(bannerImgRef,bannerImg);
          const bannerImgUrl = await getDownloadURL(bannerImgRef);
          console.log(bannerImgUrl);

          // Uploading Small Image
          const smallImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
          await uploadBytes(smallImgRef,smallImg);
          const smallImgUrl = await getDownloadURL(smallImgRef);
          console.log(smallImgUrl);

          const podcastData = {
            title : title,
            description : description,
            bannerImage : bannerImgUrl,
            smallImage : smallImgUrl,
            created_By : auth.currentUser.uid
          }

          const docRef = await addDoc(collection(db,"podcasts"),podcastData);
          

          toast.success("Podcast created succesfully");
          setLoading(false);
          setTitle("");
          setDescription("");
          setBannerImg(null);
          setSmallImg(null);

          } catch (error) {
            toast.error(error.message);
            setLoading(false);
          }
          
        }
        else{
          toast.error("Please fill all feilds");
          setLoading(false);
        }
    }

    function bannerImageHandle(file){
        setBannerImg(file);
    }

    function smallImageHandle(file){
        setSmallImg(file);
    }

  return (
    <form className='create-podcast-form'>
        <InputComponent type="text" placeholder="Podcast Title" state={title} setState={setTitle} required={true} />
        <InputComponent type="text" placeholder="Podcast Description" state={description} setState={setDescription} required={true} />
        <FileInput text="Banner Image Upload" accept={"Image/*"} id="banner-img" fileHandleFunction={bannerImageHandle}/>
        <FileInput text="Small Image Upload" accept={"Image/*"} id="small-img" fileHandleFunction={smallImageHandle}/>
        <div className='create-podcast-btn'>
          <Button name={loading ? "Loading..." : "Create A Podcast"} onClick={handleSubmit} />
        </div>   
    </form>
  )
}

export default CreatePodcastForm;
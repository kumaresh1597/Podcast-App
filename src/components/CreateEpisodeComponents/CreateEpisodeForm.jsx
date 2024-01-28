import React,{useState} from 'react'
import InputComponent from '../common/Input/InputComponent';
import Button from '../common/Button';
import FileInput from '../common/Input/FileInput';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import "./style.css";

import { db,storage,auth } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import TextAreaInput from '../common/Input/TextAreaInput';


const CreateEpisodeForm = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [audioFile,setAudioFile] = useState();

    const [loading,setLoading] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function audioFileHandle(audio){
        setAudioFile(audio);
    }

    async function handleSubmit(e){
      e.preventDefault();
      setLoading(true);
        if(title && description && audioFile && id){

            try {
                //Uploading Audio File
                const audioFileRef = ref(storage,`podcasts-episodes/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(audioFileRef,audioFile);
                const audioFileUrl = await getDownloadURL(audioFileRef);
                console.log(audioFileUrl);
                
                const episodeData = {
                    title : title,
                    description : description,
                    audioFile : audioFileUrl,
                    created_By : auth.currentUser.uid
                }
                
                const docRef = await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
                
                toast.success("Episode created succesfully");
                setLoading(false);
                setTitle("");
                setDescription("");
                setAudioFile(null);
                navigate(`/podcast/${id}`);
                
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }

        } else{
            toast.error("Please enter all feilds");
            setLoading(false);
        }
    }

  return (
    <form className='create-episode-form'>
        <InputComponent type="text" placeholder="Episode Title" state={title} setState={setTitle} required={true} />
        <TextAreaInput placeholder="Episode Description" state={description} setState={setDescription} required={true} />
        <FileInput text="Upload Audio file" accept={"Audio/*"} id="audio-file" fileHandleFunction={audioFileHandle}/>
        <div className='create-episode-btn'>
          <Button name={loading ? "Loading..." : "Create Episode"} onClick={handleSubmit} />
        </div>   
    </form>
  )
}

export default CreateEpisodeForm
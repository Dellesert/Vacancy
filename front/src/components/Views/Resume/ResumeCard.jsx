
import { useParams } from "react-router-dom";
import Card from "../../UI/Card/Card";
import styles from './style.module.css'
import { useEffect, useState } from "react";
import axios from "axios";



const ResumeCard = () => {
    const [resume, setResume] = useState('')
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`/resume/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setResume(res.data)
          })
          .catch((error) => console.log(error));
      }, [id]);


        return (
            <div className={styles.content}>
                {
                    resume 
                    ? <Card id={resume.id} position={resume.title} salary={resume.salary} body={<div dangerouslySetInnerHTML={{ __html: resume.description }} />} footer={''} page={'resume'} button={'Откликнуться'}/>
                    : <div>Нет резюме</div>

                }
            </div>
        );
};

export default ResumeCard;
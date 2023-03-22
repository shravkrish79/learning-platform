import { useNavigate, useLocation } from "react-router-dom";

export default function CourseDetail() {
    const Navigate = useNavigate();
    const Location = useLocation();
    const data = Location.state.data;
    const profileData = Location.state.profileData;

    const docs = data.docFiles.map((recs, idx) => <li key={idx}><a href={recs} target="_blank" rel="noreferrer">File {idx}</a></li>);
    const videos = data.videoFiles.map((recs, idx) => <iframe title={idx} src={recs + "loop=1&controls=1"} allowFullScreen frameborder="5"> </iframe>);
    return (
        <div id="course-detail">
            <img src={data.courseImage} alt={data.courseName} />
            <h1>{data.courseName}</h1>
            <p>{data.courseDesc}</p>
            <h3>Reference Documents: </h3>
            <ul>{docs}</ul>
            <h3>course Videos:
            </h3>
            <p>{videos}</p>
            <button className="detail-cancel-btn" onClick={() => Navigate("/contentpage", { state: { profileData } })}>Cancel</button>
        </div>
    );
}
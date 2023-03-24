import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-top">
                <a href='https://www.twitter.com' rel='noreferrer' target="_blank"><FaTwitter /></a>
                <a href='https://www.facebook.com' rel='noreferrer' target="_blank"><FaFacebookF /></a>
                <a href='https://www.youtube.com/@VeganFresh' rel='noreferrer' target="_blank"><FaYoutube /></a>
                <a href='https://www.instagram.com' rel='noreferrer' target="_blank"><FaInstagram /></a>
            </div>
            <div className="footer-bottom">
                <span>©  Poongothai Rajesh 2023</span>
            </div>
        </div>
    );
};
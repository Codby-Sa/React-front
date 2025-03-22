import React from 'react';
import './video.css';

function Video1() {
    return (
        <div className="container">
            <h2>Strogonoff</h2>
            <div className="video-wrapper">
                <video width="100%" controls muted={false}>
                    <source
                        src="/videos/pesca.mp4"
                        type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                </video>
            </div>
        </div>
    );
}

export default Video1;

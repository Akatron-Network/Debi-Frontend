import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesComponent() {
    
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  
  return (
  
    <div className="partComp">

        <Particles
            id="tsparticles"
            init={particlesInit}

            options={{
                fpsLimit: 200,
                backgroundMode: {
                enable: true,
                zIndex: 0
                },
                particles: {
                    number: {
                        value: 30,
                        density: {
                            enable: true,
                            area: 600,
                            factor: 1000
                        }
                    },
                    color: {
                        value: "#1A6C3D66",
                    },
                    shape: {
                        type: "circle",
                        options: {
                            // polygon: {
                            //     sides: 5
                            // },
                            // image: {
                            //     src: "",
                            //     width: 100,
                            //     height: 100
                            // }
                        }
                    },
                    stroke: {
                        width: 0
                    },
                    opacity: {
                        value: 1,
                        random: false,
                        animation: {
                            enable: false,
                            speed: 3,
                            minimumValue: 0,
                            sync: false
                        }
                    },
                    size: {
                        value: 4,
                        random: false,
                        animation: {
                            enable: false,
                            speed: 2,
                            minimumValue: 0,
                            sync: false
                        }
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#858585",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        outMode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                    distance: 400,
                    links: {
                        opacity: 1
                    }
                    },
                    bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 0.8
                    },
                    repulse: {
                    distance: 200,
                    duration: 0.4
                    },
                    push: {
                    quantity: 4
                    },
                    remove: {
                    quantity: 2
                    }
                }
                },
                detectRetina: true,
                background: {
                color: "transparent",
                image: "",
                position: "50% 50%",
                repeat: "no-repeat",
                size: "cover"
                }
            }}
        />
    </div>
  )
}

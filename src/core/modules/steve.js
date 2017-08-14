// define('model.Steve', ['THREE', 'Model', 'Pose', 'Animation'], function (THREE, Model) {
export let Steve = {
        name: 'Steve',
        defaultType:'steve',
        typeMap: { steve: 0, alex: 1 },
        versionMap: ['new', 'original'],
        partsData: {//parts data
            head: {
                name: 'head',
                map: [{ //map中的索引对应typeMap中的数值
                    basic: {
                        boxSize: [8, 8, 8],
                        textureSize: [8, 8, 8],
                        texturePosition: {
                            original: [8, 8],
                            new: [8, 8],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [8.6, 8.6, 8.6],
                        textureSize: [8, 8, 8],
                        texturePosition: {
                            original: [40, 8],
                            new: [40, 8],
                        },
                        visible: true,
                    }
                }],
                center: [0, -3, 0],
                position: [0, 10, 0], //部位在模型中的定位
            },
            body: {
                name: 'body',
                map: [{
                    basic: {
                        boxSize: [8, 12, 4],
                        textureSize: [8, 12, 4],
                        texturePosition: {
                            original: [20, 20],
                            new: [20, 20],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [8.59, 12.59, 4.59],
                        textureSize: [8, 12, 4],
                        texturePosition: {
                            original: [20, 36],
                            new: [20, 36],
                        },
                        visible: true,
                    }
                }],
                center: [0, 0, 0],
                position: [0, 0, 0],
            },
            leftArm: {
                name: 'Left Arm',
                map: [{
                    basic: {
                        boxSize: [4, 12, 4],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [44, 20],
                            new: [36, 52],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [4.8, 12.8, 4.8],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [52, 52],
                            new: [52, 52],
                        },
                        visible: true,
                    }
                }, {
                    basic: {
                        boxSize: [3, 12, 4],
                        textureSize: [3, 12, 4],
                        texturePosition: {
                            original: [44, 20],
                            new: [36, 52],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [3.8, 12.8, 4.8],
                        textureSize: [3, 12, 4],
                        texturePosition: {
                            original: [52, 52],
                            new: [52, 52],
                        },
                        visible: true,
                    }
                }],
                center: [-2, 5, 0],
                position: [6, 0, 0],
            },
            rightArm: {
                name: 'Right Arm',
                map: [{
                    basic: {
                        boxSize: [4, 12, 4],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [44, 20],
                            new: [44, 20],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [4.8, 12.8, 4.8],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [44, 36],
                            new: [44, 36],
                        },
                        visible: true,
                    }
                }, {
                    basic: {
                        boxSize: [3, 12, 4],
                        textureSize: [3, 12, 4],
                        texturePosition: {
                            original: [44, 20],
                            new: [44, 20],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [3.8, 12.8, 4.8],
                        textureSize: [3, 12, 4],
                        texturePosition: {
                            original: [44, 36],
                            new: [44, 36],
                        },
                        visible: true,
                    }
                }],
                center: [2, 5, 0],
                position: [-6, 0, 0],
            },
            leftLeg: {
                name: 'Left Leg',
                map: [{
                    basic: {
                        boxSize: [4, 12, 4],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [4, 20],
                            new: [20, 52],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [4.8, 12.8, 4.8],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [4, 52],
                            new: [4, 52],
                        },
                        visible: true,
                    }
                }],
                center: [0, 6, 0],
                position: [2, -12, 0],
            },
            rightLeg: {
                name: 'Right Leg',
                map: [{
                    basic: {
                        boxSize: [4, 12, 4],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [4, 20],
                            new: [20, 52],
                        },
                        visible: true,
                    },
                    overlay: {
                        boxSize: [4.8, 12.8, 4.81],
                        textureSize: [4, 12, 4],
                        texturePosition: {
                            original: [4, 36],
                            new: [4, 36],
                        },
                        visible: true,
                    }
                }],
                center: [0, 6, 0],
                position: [-2, -12, 0],
            },
        },
        skin: (function () {
            let skin = new Image();
            skin.src = './defaultskin.png';
            return skin;
        })(),
        poses: [{
            name: 'walk',
            defination: {
                'head': {
                    rotate: [-3, 0, 0],
                },
                'leftArm': {
                    rotate: [15, 3, 0],
                },
                'rightArm': {
                    rotate: [-30, -6, 0],
                },
                'leftLeg': {
                    rotate: [-20, 0, 0],
                },
                'rightLeg': {
                    rotate: [20, 0, 0],
                },
            },
            repeat: 0,
            duration: 800
        }, {
            name: 'walkBack',
            defination: {
                'head': {
                    rotate: [3, 0, 0],
                },
                'leftArm': {
                    rotate: [-30, 6, 0],
                },
                'rightArm': {
                    rotate: [15, -3, 0],
                },
                'leftLeg': {
                    rotate: [20, 0, 0],
                },
                'rightLeg': {
                    rotate: [-20, 0, 0],
                },
            },
            repeat: 0,
            duration: 800
        }],
        animations: [
             {
                name:'walk',
                timeline: ['walk', 'walkBack'],
                restart: true,
            }
        ]
    };

//     let Steve = new Model(modelOptions, function (model) {
//         if (model.skin && model.skin.height) model.versionIndex = 0;
//         else model.versionIndex = 1;
//     });
//     return Steve;
// });

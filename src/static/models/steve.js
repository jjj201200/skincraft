// define('model.Steve', ['THREE', 'Model', 'Pose', 'Animation'), function (THREE, Model) {
import SteveDefaultSkin from './defaultSkins/defaultskin.png';
import { Vector3, Vector2 } from '../apis';
const VERTICAL_MIRROR = 0;
export let Steve = {
	name: 'Steve',
	version: '1',
	textureSize: {
		width: 64,
		height: 64
	},
	parts: {
		//parts data
		head: {
			basic: {
				size: new Vector3(8, 8, 8),
				textureSize: new Vector3(8, 8, 8),
				texturePosition: new Vector2(8, 8),
				position: new Vector3(0, 10, 0),
				center: new Vector3(0, -3, 0),
				visible: true,
			},
			overlay: {
				size: new Vector3(8.6, 8.6, 8.6),
				textureSize: new Vector3(8, 8, 8),
				texturePosition: new Vector2(40, 8),
				position: new Vector3(0, 10, 0),
				center: new Vector3(0, -3, 0),
				visible: true,
			}
		},
		body: {
			basic: {
				size: new Vector3(8, 12, 4),
				textureSize: new Vector3(8, 12, 4),
				texturePosition: new Vector2(20, 20),
				visible: true,
			},
			overlay: {
				size: new Vector3(8.59, 12.59, 4.59),
				textureSize: new Vector3(8, 12, 4),
				texturePosition: new Vector2(20, 36),
				visible: true,
			}
		},
		leftArm: {
			basic: {
				size: new Vector3(4, 12, 4),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(36, 52),
				position: new Vector3(6, 0, 0),
				center: new Vector3(-2, 5, 0),
				visible: true,
			},
			overlay: {
				size: new Vector3(4.8, 12.8, 4.8),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(52, 52),
				position: new Vector3(6, 0, 0),
				center: new Vector3(-2, 5, 0),
				visible: true,
			}
		},
		rightArm: {
			basic: {
				size: new Vector3(4, 12, 4),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(44, 20),
				position: new Vector3(-6, 0, 0),
				center: new Vector3(2, 5, 0),
				visible: true,
			},
			overlay: {
				size: new Vector3(4.8, 12.8, 4.8),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(44, 36),
				position: new Vector3(-6, 0, 0),
				center: new Vector3(2, 5, 0),
				visible: true,
			}
		},
		leftLeg: {
			basic: {
				size: new Vector3(4, 12, 4),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(20, 52),
				position: new Vector3(2, -12, 0),
				center: new Vector3(0, 6, 0),
				visible: true,
			},
			overlay: {
				size: new Vector3(4.8, 12.8, 4.8),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(4, 52),
				position: new Vector3(2, -12, 0),
				center: new Vector3(0, 6, 0),
				visible: true,
			}
		},
		rightLeg: {
			basic: {
				size: new Vector3(4, 12, 4),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(20, 52),
				position: new Vector3(-2, -12, 0),
				center: new Vector3(0, 6, 0),
				visible: true,
			},
			overlay: {
				size: new Vector3(4.8, 12.8, 4.81),
				textureSize: new Vector3(4, 12, 4),
				texturePosition: new Vector2(4, 36),
				position: new Vector3(-2, -12, 0),
				center: new Vector3(0, 6, 0),
				visible: true
			}

		}
	},
	skin: (function () {
		let skin = new Image();
		skin.src = SteveDefaultSkin;
		return skin;
	})(),
};

//     let Steve = new Model(modelOptions, function (model) {
//         if (model.skin && model.skin.height) model.versionIndex = 0;
//         else model.versionIndex = 1;
//     });
//     return Steve;
// });

import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileupload";

cloudinary.config({
    cloud_name: 'djrjsqtks',
    api_key: '959797954786181',
    api_secret: 'd8XpDPmscxVc13Kzx2co8EXKleU'
});

describe('Tests on file fileupload', () => {

    test('should upload a file and return an url', async() => {
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
        expect(url.includes('https')).toBeTruthy();

        // Delete image by id
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '')

        const folderName = "tests";
        cloudinary.v2.api.delete_resources(`${imageId}`, {}, ()=> {
            // done();
         });
    })

    test('should return an error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    })

})
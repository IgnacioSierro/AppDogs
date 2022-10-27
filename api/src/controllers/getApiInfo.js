const axios = require( 'axios' );

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map((el)=>{
        return {
            id:el.id,
            name:el.name,
            image:el.image.url,
            weightMin: el.weight.metric? el.weight.metric.split('-')[0] : "1",
            weightMax: el.weight.metric.split('-')[1],
            heightMin: el.height.metric.split('-')[0],
            heightMax: el.height.metric.split('-')[1],
            life_span: el.life_span,
            temperaments: [el.temperament].join().split(',').map( el => el.trim()),
        }
    })
    return apiInfo;
}

module.exports = getApiInfo;
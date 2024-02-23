import cors from 'cors';
import express from 'express';
import {
    sentence
} from 'txtgen';
const app = express();
app.use(cors())


function genParagraph(sentences) {
    let paragraph = '';
    for(let i = 0; i < sentences; i++) {
        paragraph += sentence() + '. ';
    }
    console.log(paragraph)
    return paragraph;
}
function capitalizeFirstLetter(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
app.get('/generate-paragraph', (req, res) => {
    const sentences = parseInt(req.query.sentences) || 3;
    const punctuations = req.query.punctuations === 'true';
    console.log(punctuations) 
    const capital = req.query.capital === 'true';

    let filteredText = genParagraph(sentences);

    if (capital) {
        // Corrected to use filteredText instead of paragraph
        filteredText = filteredText.split('. ').map(sentence => capitalizeFirstLetter(sentence)).join('. ');
    } else {
        filteredText = filteredText.toLowerCase();
    }

    if (!punctuations) {
        filteredText = filteredText.replace(/[^\w\s]/g, '');
    }

    res.json({ paragraph: filteredText });
});
app.use((err,req,res,next)=>{
    res.status(500).json({error:err.message})
})
app.listen(process.env.PORT||3000)
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from '@emotion/styled';
import { experimentalStyled as overrideMaterial } from '@material-ui/core/styles';
import getNewsArticles from './lib/getNewsArticles';

const StyledCard = overrideMaterial(Card)`
  height: 100%;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const DEFAULT_IMAGE = 'https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg';

const App = () => {
  const [data, setData] = useState({ newsArticles: [] });
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  console.log(data.newsArticles[index]);

  const { title, description, url } = data.newsArticles[index];

  const handleClickOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchArticles = async () => {

      const variables = {
        keywords: ['hunkemoller'],
        offset: offset,
      };
      const result = await getNewsArticles(variables);
      setData({
        newsArticles: result.fashionunitedNlNewsArticles,
      });
    };
    fetchArticles();
  }, [offset]);

  return (
    <Container>
      <h1>Fashion News</h1>
      <Grid container spacing={3}>
        {data.newsArticles.map((newsArticle, index) => {

         const { title, imageUrl, description } = newsArticle;

          return (
          <Grid item xs={12} sm={3} key={imageUrl + index}>
            <StyledCard>
              <CardMedia
                component="img"
                alt={title}
                image={imageUrl ? `https://r.fashionunited.com${imageUrl}` : DEFAULT_IMAGE}
                title={title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
                <Typography variant="button" color="textSecondary" component="div">
                  {' '}
                  <Button onClick={(index) => handleClickOpen(index)}>Read more</Button>
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          )
})}
      </Grid>
      <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <a href={url}>
              Read more
            </a>
          </DialogActions>
        </Dialog>
      <Button onClick={() => setOffset(offset + 10)} variant="contained">Load more</Button>
    </Container>
  );
};

export default App;

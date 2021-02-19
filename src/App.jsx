import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      const variables = {
        keywords: ['hunkemoller'],
      };
      const result = await getNewsArticles(variables);
      setData({
        newsArticles: result.fashionunitedNlNewsArticlesConnection.edges,
      });
      setPageInfo(result.fashionunitedNlNewsArticlesConnection.pageInfo)
    };
    fetchArticles();
  }, [data]);

  return (
    <Container>
      <h1>Fashion News</h1>
      <Grid container spacing={3}>
        {data.newsArticles.map((newsArticle) => {

         const {node: { title, imageUrl, description, url }, cursor} = newsArticle

          return (
          <Grid item xs={12} sm={3} key={imageUrl}>
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
                  <a href={url}>Read more</a>
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          )
})}
      </Grid>
    </Container>
  );
};

export default App;

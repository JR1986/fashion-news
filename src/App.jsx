import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "@emotion/styled";
import { experimentalStyled as overrideMaterial } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/core/Pagination";
import getNewsArticles from "./lib/getNewsArticles";

const Pagination = ({ onChange, page, count }) => (
  <>
    <MuiPagination
      count={count}
      page={page}
      color="primary"
      onChange={onChange}
    />
  </>
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

const StyledCard = overrideMaterial(Card)`
  height: 100%;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const DEFAULT_IMAGE =
  "https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg";

const App = () => {
  const [data, setData] = useState({ newsArticles: [] });
  const [open, setOpen] = useState(false);
  const [modalArticle, setModalArticle] = useState({});
  const [offset, setOffset] = useState(0);
  const [page, setPage] = React.useState(1);

  const {
    title: modalTitle,
    url: modalUrl,
    description: modalDescription,
    imageUrl: modalImageUrl,
  } = modalArticle;

  const handleModal = (article) => {
    setModalArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const variables = {
      keywords: ["nike"],
      offset,
    };
    const fetchArticles = async () => {
      const result = await getNewsArticles(variables);
      setData({
        newsArticles: result.fashionunitedNlNewsArticles,
      });
      setOffset((page - 1) * 10);
    };
    fetchArticles();
  }, [page, offset]);

  return (
    <Container>
      <h1>Fashion News</h1>
      <Grid container spacing={3}>
        {data.newsArticles.map((newsArticle, index) => {
          const { title, imageUrl } = newsArticle;

          return (
            <Grid item xs={12} sm={3} key={imageUrl + index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  alt={title}
                  image={
                    imageUrl
                      ? `https://r.fashionunited.com${imageUrl}`
                      : DEFAULT_IMAGE
                  }
                  title={title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {title}
                  </Typography>
                  <Typography
                    variant="button"
                    color="textSecondary"
                    component="div"
                  >
                    {" "}
                    <Button onClick={() => handleModal(newsArticle)}>
                      Read more
                    </Button>
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            alt={modalTitle}
            image={
              modalImageUrl
                ? `https://r.fashionunited.com${modalImageUrl}`
                : DEFAULT_IMAGE
            }
            title={modalTitle}
          />
          <DialogContentText id="alert-dialog-description">
            {modalDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <a href={modalUrl}>Read more</a>
        </DialogActions>
      </Dialog>
      <Pagination onChange={handlePagination} page={page} count={5} />
    </Container>
  );
};

export default App;

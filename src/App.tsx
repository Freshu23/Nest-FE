import { useState } from "react";

import { Article } from "./components/article/Article";
import { AddArticle } from "./components/add-article/AddArticle";
import { EditArticle } from "./components/edit-article/EditArticle";
import { IArticle } from "./types/article";

import {
  getArticles,
  deleteArticle,
  createArticle,
  updateArticle,
} from "./service/article";
import { useEffect } from "react";
import "./App.css";
import { Button, Flex, Modal } from "@mantine/core";
import image from "./assets/Article.png";

const App = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [addOpened, setAddOpened] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<IArticle | false>(false);
  const [deleteOpened, setDeleteOpened] = useState<boolean>(false);
  const [articleId, setArticleId] = useState<number>(0);

  const handleAddArticle = (artile: any) => {
    createArticle(artile).then((article) => {
      setArticles([...articles, article]);
    });
  };

  const handleGetArticles = async () => {
    const articlesResponse = await getArticles();
    setArticles(articlesResponse);
  };

  const handleDeleteArticle = async (id: number) => {
    deleteArticle(id).then(() => {
      setArticles(articles.filter((article) => article.id !== id));
      setDeleteOpened(false);
    });
  };

  const handleEditArticle = async (artile: any) => {
    updateArticle(artile).then(() => {
      setArticles(
        articles.map((article) => (article.id === artile.id ? artile : article))
      );
    });
  };

  useEffect(() => {
    handleGetArticles();
  }, []);

  return (
    <div className="container">
      <Modal
        centered
        onClose={() => setDeleteOpened(false)}
        opened={deleteOpened}
      >
        <Flex justify="center" align="center" direction="column">
          {" "}
          <h2 style={{ textAlign: "center" }}>
            Are you sure you want to delete the article?
          </h2>
          <Button
            onClick={() => handleDeleteArticle(articleId)}
            fullWidth
            bg="red"
            styles={{
              root: {
                "&:hover": {
                  backgroundColor: "red",
                  outline: "none",
                  border: "none",
                },
              },
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => setDeleteOpened(false)}
            mt={12}
            mb={12}
            fullWidth
            variant="outline"
          >
            Cancel
          </Button>
        </Flex>
      </Modal>
      <AddArticle
        handleAddArticle={handleAddArticle}
        opened={addOpened}
        onClose={() => setAddOpened(false)}
      />
      <EditArticle
        activeArticle={activeArticle}
        handleEditArticle={handleEditArticle}
        opened={!!activeArticle}
        onClose={() => setActiveArticle(false)}
      />
      <img style={{ height: 350 }} src={image}></img>{" "}
      <button className={"button"} onClick={() => setAddOpened(true)}>
        Add new article
      </button>
      <Flex mb={48} direction="column" gap="md">
        {articles.map((article: IArticle) => (
          <Article
            openDrawer={() => setActiveArticle(article)}
            article={article}
            handleDeleteArticle={() => {
              setDeleteOpened(true);
              setArticleId(article.id);
            }}
            key={article.id}
          />
        ))}
      </Flex>
    </div>
  );
};

export default App;

import type { IArticle } from "../../types/article";
import { Button, Flex, Card, Accordion } from "@mantine/core";
import styles from "./styles.module.css";
import { IconCalendar } from "@tabler/icons-react";

interface ArticleProps {
  article: IArticle;
  handleDeleteArticle: (id: number) => void;
  openDrawer: () => void;
}

export const Article = ({
  article,
  handleDeleteArticle,
  openDrawer,
}: ArticleProps) => {
  const createdAt = new Date(article.createdAt);
  return (
    <Card className={styles.card} w={900} radius={12} bg="gray" p={40}>
      <h1>{article.title}</h1>
      <p className={styles.createdAt}>
        <IconCalendar className={styles.icon} color="#5a5a5a" />
        Created at:{" "}
        {`${createdAt.toLocaleDateString()} ${createdAt
          .toLocaleTimeString()
          .split(":")
          .slice(0, 2)
          .join(":")}`}
      </p>
      <p>{article.body}</p>

      <Accordion defaultValue="">
        <Accordion.Item value="customization">
          <Accordion.Control></Accordion.Control>
          <Accordion.Panel>
            <Flex gap="md" m={"10px 0"}>
              <Button
                onClick={() => handleDeleteArticle(article.id)}
                color="red"
              >
                Delete
              </Button>
              <Button onClick={openDrawer} variant="gradient" color="cyan">
                Edit
              </Button>
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};

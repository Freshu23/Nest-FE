import { Button, Drawer, TextInput, Flex, Textarea } from "@mantine/core";
import { IArticle } from "../../types/article";
interface AddArticleProps {
  opened: boolean;
  onClose: () => void;
  handleEditArticle: (article: IArticle) => void;
  activeArticle: IArticle;
}
export const EditArticle = ({
  onClose,
  opened,
  handleEditArticle,
  activeArticle,
}: AddArticleProps) => {
  const onSubmit = (e: any) => {
    e.preventDefault();

    handleEditArticle({
      title: e.target.title.value,
      body: e.target.body.value,
      id: activeArticle.id,
    });

    onClose();
  };
  return (
    <Drawer position="right" opened={opened} onClose={onClose} size="md">
      <h3>Edit</h3>
      <form onSubmit={onSubmit}>
        <Flex gap="md" direction="column">
          <TextInput
            defaultValue={activeArticle.title}
            name="title"
            label="Title"
            required
          />
          <Textarea
            styles={{ input: { height: 300 } }}
            defaultValue={activeArticle.body}
            name="body"
            label="Body"
            required
          />
          <Button type="submit">Edit</Button>
        </Flex>
      </form>
    </Drawer>
  );
};

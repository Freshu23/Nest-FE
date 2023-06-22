import { Button, Drawer, TextInput, Flex, Textarea } from "@mantine/core";
import { IArticle } from "../../types/article";
interface AddArticleProps {
  opened: boolean;
  onClose: () => void;
  handleAddArticle: (article: IArticle) => void;
}
export const AddArticle = ({
  onClose,
  opened,
  handleAddArticle,
}: AddArticleProps) => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleAddArticle({
      title: e.target.title.value,
      body: e.target.body.value,
    });
    onClose();
  };
  return (
    <Drawer position="right" opened={opened} onClose={onClose} size="md">
      <h3>Add new article</h3>
      <form onSubmit={onSubmit}>
        <Flex gap="md" direction="column">
          <TextInput name="title" label="Title" required />
          <Textarea
            styles={{ input: { height: 300 } }}
            name="body"
            label="Body"
            required
          />
          <Button type="submit">Add</Button>
        </Flex>
      </form>
    </Drawer>
  );
};

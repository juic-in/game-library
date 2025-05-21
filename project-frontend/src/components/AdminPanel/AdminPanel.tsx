import { Box, Button, Flex } from '@chakra-ui/react';
import { AddGameForm } from './AddGameForm';
import { DeleteGameForm } from './DeleteGameForm';
import { UpdateGameForm } from './UpdateGameForm';
import { useState } from 'react';

enum Actions {
  Add = 'ADD',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export const AdminPanel = () => {
  const [action, setAction] = useState<Actions>(Actions.Add);

  return (
    <Flex
      flexDir="column"
      p={5}
      className="admin-panel"
      color='black'
    >
      <Flex className="admin-action-select" gap={1} mb={3}>
        <Button
          onClick={() => setAction(Actions.Add)}
          bg="gray.200"
          borderRadius="0px"
          color='black'
        >
          Add Game
        </Button>
        <Button
          onClick={() => setAction(Actions.Update)}
          bg="gray.200"
          borderRadius="0px"
          color='black'
        >
          Update Game
        </Button>
        <Button
          onClick={() => setAction(Actions.Delete)}
          bg="gray.200"
          borderRadius="0px"
          color='black'
        >
          Delete Game
        </Button>
      </Flex>
      <Box height="3px" width="95%" bg="black" mb={6} mx='auto'/>

      {action === Actions.Add && <AddGameForm />}
      {action === Actions.Update && <UpdateGameForm />}
      {action === Actions.Delete && <DeleteGameForm />}
    </Flex>
  );
};

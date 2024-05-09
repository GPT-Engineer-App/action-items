import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useColorModeValue, Text } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} colorScheme="blue">Add Task</Button>
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} bg={bg} p={4} display="flex" justifyContent="space-between" alignItems="center">
              <Text>{task.text}</Text>
              <div>
                <IconButton icon={<FaEdit />} onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))} isRound="true" aria-label="Edit Task" />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} isRound="true" aria-label="Delete Task" ml={2} />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
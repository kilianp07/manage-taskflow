import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Modal, TextInput, Button } from 'react-native';
import { useTaskStore } from '@/stores/taskStore';
import { Plus, Trash2 } from 'lucide-react-native';
import { Task } from '@/lib/api';

export default function TasksScreen() {
  const { tasks, isLoading, error, fetchTasks, deleteTask, updateTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toISOStringDate = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Pressable
              onPress={() => updateTask(item.id, { completed: !item.completed })}
              onLongPress={() => {
                setEditingTask(item);
                setEditedTitle(item.title);
                setEditedDescription(item.description);
                setEditedDueDate(item.dueDate ? item.dueDate.split('T')[0] : '');
              }}
              style={styles.taskContent}>
              <Text style={[
                styles.taskTitle,
                item.completed && styles.completedTask
              ]}>
                {item.title}
              </Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </Pressable>
            <Pressable
              onPress={() => deleteTask(item.id)}
              testID={`delete-button-${item.id}`}
              style={styles.deleteButton}>
              <Trash2 size={20} color="#FF3B30" />
            </Pressable>
          </View>
        )}
      />
      <Pressable style={styles.fab} testID='add-button'>
        <Plus size={24} color="#FFFFFF" />
      </Pressable>
      {editingTask && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setEditingTask(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Titre"
                value={editedTitle}
                onChangeText={setEditedTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={editedDescription}
                onChangeText={setEditedDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                value={editedDueDate}
                onChangeText={setEditedDueDate}
              />
              <View style={styles.modalButtons}>
                <Button
                  title="Enregistrer"
                  onPress={() => {
                    updateTask(editingTask.id, {
                      title: editedTitle,
                      description: editedDescription,
                      dueDate: toISOStringDate(editedDueDate),
                    })
                      .then(() => setEditingTask(null))
                      .catch((err) => {
                        console.error('Erreur lors de la mise à jour de la tâche :', err);
                      });
                  }}
                />
                <Button title="Annuler" onPress={() => setEditingTask(null)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  taskDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
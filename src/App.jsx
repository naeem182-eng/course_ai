import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Stack,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import {
  Add as AddIcon,
  FormatListBulleted as ListIcon,
  FactCheck as ChecklistIcon,
  TaskAlt as TaskAltIcon,
} from '@mui/icons-material';

import { TodoItem } from './components/TodoItem';
import { ChecklistCard } from './components/ChecklistCard';

// สร้าง Material-UI Theme รองรับ Font Sarabun / Prompt / Roboto
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#7c3aed',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: ['Prompt', 'Roboto', 'sans-serif'].join(','),
  },
  shape: {
    borderRadius: 10,
  },
});

export function App() {
  // Central State ใน Parent Component (State Lifting)
  const [todos, setTodos] = useState([
    {
      id: '1',
      title: 'ส่งสรุปผลการประชุม Sprint Planning',
      priority: 'high',
      dueDate: '2026-10-10',
      completed: false,
    },
    {
      id: '2',
      title: 'รีวิว Pull Request โมดูลยืนยันตัวตน (Authentication)',
      priority: 'medium',
      dueDate: '2026-10-12',
      completed: true,
    },
    {
      id: '3',
      title: 'อัปเดตเอกสาร API และ Swagger Documentation',
      priority: 'low',
      dueDate: '2026-10-15',
      completed: false,
    },
  ]);

  // Tab State: 0 = Todo App, 1 = Checklist ตรวจสอบ
  const [currentTab, setCurrentTab] = useState(0);

  // New Todo Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('2026-10-20');
  const [formError, setFormError] = useState('');

  // Toast / Feedback State
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // State Lifting: Toggle Todo
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = !t.completed;
          showToast(
            nextStatus ? `ทำเครื่องหมาย "${t.title}" ว่าเสร็จแล้ว` : `เปลี่ยน "${t.title}" เป็นยังไม่เสร็จ`,
            'info'
          );
          return { ...t, completed: nextStatus };
        }
        return t;
      })
    );
  };

  // State Lifting: Delete Todo
  const handleDelete = (id) => {
    const target = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast(`ลบงาน "${target?.title || ''}" เรียบร้อยแล้ว`, 'warning');
  };

  // State Lifting: Edit Todo
  const handleEdit = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
    showToast('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
  };

  // State Lifting: Add New Todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('กรุณากรอกชื่องาน');
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      priority: newPriority,
      dueDate: newDueDate,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setNewTitle('');
    setFormError('');
    showToast('เพิ่มงานใหม่สำเร็จ!', 'success');
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: { xs: 2.5, sm: 4 } }}>
        {/* Header App */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <TaskAltIcon color="primary" sx={{ fontSize: { xs: 32, sm: 40 } }} />
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
            >
              Smart Todo UI
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            React Component Architecture & Verification Playground
          </Typography>
        </Box>

        {/* Tab Navigation */}
        <Paper sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs
            value={currentTab}
            onChange={(e, val) => setCurrentTab(val)}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab icon={<ListIcon />} iconPosition="start" label="รายการงาน (Todo List)" />
            <Tab icon={<ChecklistIcon />} iconPosition="start" label="Checklist 5 จุดตรวจสอบ" />
          </Tabs>
        </Paper>

        {currentTab === 0 ? (
          <>
            {/* Form เพิ่มงานใหม่ */}
            <Paper elevation={1} sx={{ p: { xs: 2, sm: 2.5 }, mb: 3, borderRadius: 3 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                ➕ เพิ่มงานใหม่ (Add Todo)
              </Typography>
              <Box component="form" onSubmit={handleAddTodo}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="ชื่องานที่ต้องทำ"
                    placeholder="เช่น ส่งรายงานประจำสัปดาห์..."
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                      if (formError) setFormError('');
                    }}
                    error={Boolean(formError)}
                    helperText={formError}
                    size="small"
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      select
                      label="ความสำคัญ"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      size="small"
                      sx={{ minWidth: { xs: '100%', sm: 160 } }}
                    >
                      <MenuItem value="high">ด่วนมาก (High)</MenuItem>
                      <MenuItem value="medium">ปานกลาง (Medium)</MenuItem>
                      <MenuItem value="low">ปกติ (Low)</MenuItem>
                    </TextField>

                    <TextField
                      type="date"
                      label="กำหนดส่ง"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: { xs: '100%', sm: 180 } }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        flexShrink: 0,
                        ml: { sm: 'auto' },
                        minHeight: 40,
                      }}
                    >
                      เพิ่มงาน
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>

            {/* ส่วนแสดงรายการ TodoItems */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={700}>
                รายการที่ต้องทำ ({todos.length})
              </Typography>
              <Chip
                label={`เสร็จแล้ว ${completedCount}/${todos.length}`}
                color={completedCount === todos.length && todos.length > 0 ? 'success' : 'default'}
                variant="outlined"
              />
            </Box>

            {todos.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                ไม่มีรายการงานที่ต้องทำในขณะนี้ กดเพิ่มงานใหม่ด้านบนได้เลย!
              </Alert>
            ) : (
              <Stack spacing={1.5} component="ul" sx={{ p: 0, m: 0 }}>
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    title={todo.title}
                    priority={todo.priority}
                    dueDate={todo.dueDate}
                    completed={todo.completed}
                    onToggle={() => handleToggle(todo.id)}
                    onDelete={() => handleDelete(todo.id)}
                    onEdit={(updatedFields) => handleEdit(todo.id, updatedFields)}
                  />
                ))}
              </Stack>
            )}
          </>
        ) : (
          /* Tab 1: Checklist 5 จุดสำคัญ */
          <ChecklistCard />
        )}

        {/* Feedback Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;

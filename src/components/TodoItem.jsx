import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Box,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Tooltip,
  TextField,
  MenuItem,
  Stack,
  Fade,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as SaveIcon,
  Close as CancelIcon,
  CalendarToday as CalendarIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';

// Config ระดับความสำคัญ
const PRIORITY_META = {
  high: { label: 'ด่วนมาก', color: 'error' },
  medium: { label: 'ปานกลาง', color: 'warning' },
  low: { label: 'ปกติ', color: 'info' },
};

/**
 * TodoItem Component สำหรับ Smart Todo UI
 * รองรับทั้ง View Mode และ Edit Mode (isEditing)
 * มีระบบ Prop Validation, Responsive Layout, Tooltip & Accessibility
 */
export function TodoItem({
  title,
  priority = 'medium',
  dueDate,
  completed = false,
  onToggle,
  onDelete,
  onEdit,
}) {
  // จุดที่ 3: Interactive State Management (Edit / View Mode)
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editPriority, setEditPriority] = useState(priority);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  const [editError, setEditError] = useState('');

  // เริ่มต้นแก้ไข: โหลดค่าเดิมเข้าฟอร์ม
  const handleStartEdit = () => {
    setEditTitle(title);
    setEditPriority(priority);
    setEditDueDate(dueDate);
    setEditError('');
    setIsEditing(true);
  };

  // ยกเลิกการแก้ไข
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError('');
  };

  // บันทึกการแก้ไข (ส่ง Callback กลับไปหา Parent ตามหลัก State Lifting)
  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      setEditError('กรุณากรอกชื่องาน');
      return;
    }
    if (onEdit) {
      onEdit({
        title: editTitle.trim(),
        priority: editPriority,
        dueDate: editDueDate,
      });
    }
    setIsEditing(false);
  };

  const currentPriority = PRIORITY_META[priority] || PRIORITY_META.medium;

  return (
    <Paper
      elevation={completed ? 0 : 2}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: completed ? 'grey.300' : 'grey.200',
        backgroundColor: completed ? '#f8fafc' : '#ffffff',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: completed ? 1 : 4,
        },
      }}
    >
      {isEditing ? (
        /* ================== โหมดแก้ไข (EDIT MODE) ================== */
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit();
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
            ✏️ แก้ไขข้อมูล Todo
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="ชื่องาน"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (editError) setEditError('');
            }}
            error={Boolean(editError)}
            helperText={editError}
            autoFocus
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              select
              size="small"
              label="ระดับความสำคัญ"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              sx={{ minWidth: { xs: '100%', sm: 140 } }}
            >
              <MenuItem value="high">ด่วนมาก (High)</MenuItem>
              <MenuItem value="medium">ปานกลาง (Medium)</MenuItem>
              <MenuItem value="low">ปกติ (Low)</MenuItem>
            </TextField>

            <TextField
              type="date"
              size="small"
              label="กำหนดส่ง"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: { xs: '100%', sm: 160 } }}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-end', sm: 'flex-start' },
                gap: 1,
                ml: { sm: 'auto' },
              }}
            >
              {/* จุดที่ 4: Accessibility & Tooltip */}
              <Tooltip title="บันทึกการแก้ไข" arrow>
                <IconButton
                  color="primary"
                  onClick={handleSaveEdit}
                  aria-label="บันทึกการแก้ไข"
                  sx={{
                    bgcolor: 'primary.50',
                    '&:hover': { bgcolor: 'primary.100' },
                  }}
                >
                  <SaveIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="ยกเลิก" arrow>
                <IconButton
                  color="inherit"
                  onClick={handleCancelEdit}
                  aria-label="ยกเลิกการแก้ไข"
                  sx={{
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Box>
      ) : (
        /* ================== โหมดแสดงผลปกติ (VIEW MODE) ================== */
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
          }}
        >
          {/* แถวบนของ Mobile / ด้านซ้ายของ Desktop: Checkbox + Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: 0,
              width: '100%',
              gap: 1,
            }}
          >
            {/* จุดที่ 4 & 5: Checkbox Toggle with Tooltip & Callback */}
            <Tooltip
              title={completed ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
              arrow
            >
              <Checkbox
                checked={completed}
                onChange={onToggle}
                color="primary"
                aria-label={`สถานะงาน ${title}`}
                sx={{ p: 0.5 }}
              />
            </Tooltip>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: completed ? 'text.disabled' : 'text.primary',
                  textDecoration: completed ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                  transition: 'all 0.2s',
                }}
              >
                {title}
              </Typography>

              {/* วันที่ และ Badge บน Mobile จะแสดงใต้ชื่อ */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}
              >
                <Chip
                  size="small"
                  label={currentPriority.label}
                  color={currentPriority.color}
                  icon={<FlagIcon sx={{ fontSize: 14 }} />}
                  variant={completed ? 'outlined' : 'filled'}
                  sx={{ fontWeight: 600, height: 22, fontSize: '0.72rem' }}
                />

                {dueDate && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                    }}
                  >
                    <CalendarIcon sx={{ fontSize: 14 }} />
                    <time dateTime={dueDate}>{dueDate}</time>
                  </Box>
                )}

                {completed && (
                  <Fade in={completed}>
                    <Chip
                      size="small"
                      label="เสร็จแล้ว"
                      color="success"
                      variant="outlined"
                      sx={{ height: 22, fontSize: '0.72rem' }}
                    />
                  </Fade>
                )}
              </Stack>
            </Box>
          </Box>

          {/* Action Buttons: Edit & Delete */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'flex-end', sm: 'center' },
              width: { xs: '100%', sm: 'auto' },
              gap: 0.5,
              pt: { xs: 0.5, sm: 0 },
              borderTop: { xs: '1px dashed #e2e8f0', sm: 'none' },
            }}
          >
            <Tooltip title="แก้ไขรายการนี้" arrow>
              <IconButton
                size="small"
                onClick={handleStartEdit}
                aria-label={`แก้ไข ${title}`}
                color="primary"
                sx={{
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'primary.50' },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="ลบรายการนี้" arrow>
              <IconButton
                size="small"
                onClick={onDelete}
                aria-label={`ลบ ${title}`}
                color="error"
                sx={{
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'error.50' },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

// จุดที่ 1: Prop Validation ด้วย prop-types ตามข้อกำหนด
TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
  dueDate: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func, // Optional สำหรับ Edit Mode
};

TodoItem.defaultProps = {
  priority: 'medium',
  completed: false,
};

export default TodoItem;

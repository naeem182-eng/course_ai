import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Verified as VerifiedIcon,
  PhoneAndroid as ResponsiveIcon,
  EditNote as EditIcon,
  TouchApp as AccessibilityIcon,
  SyncAlt as LiftingIcon,
} from '@mui/icons-material';

const CHECKLIST_ITEMS = [
  {
    id: 1,
    title: 'Prop Validation',
    desc: 'ตรวจสอบว่า TodoItem รับ props ครบถ้วน (title, priority, dueDate, completed) และเตือนผ่าน PropTypes ใน Console เมื่อขาด Prop สำคัญ',
    icon: <VerifiedIcon color="success" />,
    badge: 'PropTypes',
  },
  {
    id: 2,
    title: 'Responsive Layout Check',
    desc: 'จัดวางบน Mobile (xs) และ Desktop (sm, md) ด้วย Material-UI Breakpoints & Stack ป้องกันปุ่มหรือข้อความล้นจอ',
    icon: <ResponsiveIcon color="primary" />,
    badge: 'MUI Responsive',
  },
  {
    id: 3,
    title: 'Interactive State Management (Edit/View Mode)',
    desc: 'สลับสถานะระหว่างโหมดดูข้อมูลปกติ และโหมดแก้ไข (isEditing) พร้อมปุ่มบันทึกและยกเลิกการแก้ไขข้อมูล',
    icon: <EditIcon color="warning" />,
    badge: 'isEditing State',
  },
  {
    id: 4,
    title: 'Accessibility & UX (Tooltip & Feedback)',
    desc: 'มี Tooltip อธิบายปุ่มทุกตัว (Toggle, แก้ไข, ลบ, บันทึก), มี aria-label สำหรับ Screen Reader และ visual feedback เมื่อเสร็จ',
    icon: <AccessibilityIcon color="secondary" />,
    badge: 'A11y & Tooltip',
  },
  {
    id: 5,
    title: 'Performance & State Lifting',
    desc: 'ส่ง Callback ฟังก์ชัน (onToggle, onDelete, onEdit) กลับไปยัง Parent (App.jsx) เพื่ออัปเดต Central State ได้อย่างถูกต้อง',
    icon: <LiftingIcon color="info" />,
    badge: 'State Lifting',
  },
];

export function ChecklistCard() {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        bgcolor: '#ffffff',
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Checklist 5 จุดสำคัญในการตรวจสอบ Component TodoItem
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          เกณฑ์ตรวจสอบมาตรฐานการทำงานและการประเมินคุณภาพของโค้ด:
        </Typography>

        <Divider sx={{ mb: 1 }} />

        <List disablePadding>
          {CHECKLIST_ITEMS.map((item, index) => (
            <ListItem
              key={item.id}
              alignItems="flex-start"
              sx={{
                py: 1.25,
                px: 1,
                borderRadius: 2,
                mb: 0.5,
                bgcolor: index % 2 === 0 ? 'grey.50' : 'transparent',
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, mt: 0.5 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                      {item.id}. {item.title}
                    </Typography>
                    <Chip
                      label={item.badge}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ fontSize: '0.68rem', height: 20 }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.desc}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default ChecklistCard;

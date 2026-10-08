# Smart Todo UI - React & Material-UI Component

โปรเจกต์ตัวอย่าง React Component `TodoItem` สำหรับระบบ **Smart Todo UI** พร้อมสถาปัตยกรรมแบบ Component-Driven, รองรับการแสดงผล Responsive ด้วย Material-UI (MUI), มีโหมดสลับแก้ไขข้อมูล (Edit/View mode), ระบบตรวจสอบ Props (PropTypes), และการยกระดับสถานะ (State Lifting)

---

## 🚀 วิธีเปิดดูและรันโปรเจกต์บนเครื่องของคุณ

เปิดโปรแกรม Terminal หรือ PowerShell ในโฟลเดอร์นี้ แล้วทำตามขั้นตอน:

```bash
# 1. ติดตั้ง Dependencies (หากยังไม่ได้ติดตั้ง)
npm install

# 2. รันเซิร์ฟเวอร์สำหรับ Development
npm run dev
```

เมื่อรันคำสั่งแล้ว โปรแกรมจะเปิดเบราว์เซอร์ให้อัตโนมัติ หรือคุณสามารถเปิดดูได้ที่:
👉 **http://localhost:3000**

---

## 🌐 วิธีนำโค้ดขึ้น GitHub (Upload to GitHub)

ทำตาม 4 ขั้นตอนนี้เพื่อ Push โค้ดขึ้น Repository ส่วนตัวของคุณ:

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub
1. เข้าไปที่ [github.com](https://github.com) แล้วเข้าสู่ระบบ
2. กดปุ่ม **New** (หรือเครื่องหมาย `+` ด้านขวาบน) เพื่อสร้าง Repository ใหม่
3. ตั้งชื่อ Repository เช่น `smart-todo-ui`
4. ไม่ต้องเลือก "Initialize this repository with a README" (เนื่องจากเรามีไฟล์อยู่แล้ว)
5. กดปุ่ม **Create repository**

### ขั้นตอนที่ 2: รันคำสั่ง Git ใน Terminal โฟลเดอร์โปรเจกต์
```bash
# 1. เชื่อมต่อ Git กับ URL Repository ของคุณ (เปลี่ยน YOUR_USERNAME และ YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/smart-todo-ui.git

# 2. ตั้งชื่อ Branch หลักเป็น main
git branch -M main

# 3. Push โค้ดทั้งหมดขึ้น GitHub
git push -u origin main
```

---

## 📋 Checklist 5 จุดสำคัญในการตรวจสอบ Component TodoItem

| ลำดับ | จุดสำคัญที่ต้องตรวจสอบ | รายละเอียดและการนำไปใช้ในโค้ด | ตำแหน่งในโค้ด |
|---|---|---|---|
| **1** | **Prop Validation** | ตรวจสอบว่า Component รับ props ครบถ้วนตามข้อกำหนด (`title`, `priority`, `dueDate`, `completed`, `onToggle`, `onDelete`) และแจ้งเตือนผ่าน Console เมื่อขาด props สำคัญ | `TodoItem.propTypes` ใน `src/components/TodoItem.jsx` |
| **2** | **Responsive Layout Check** | ใช้คุณสมบัติ Breakpoints ของ Material-UI (`xs`, `sm`) จัดวางแบบ Stack และ Flexbox ป้องกันข้อความหรือปุ่มล้นหน้าจอทั้งบน Mobile และ Desktop | `Box`, `Stack`, `sx` ใน `src/components/TodoItem.jsx` |
| **3** | **Interactive State Management (Edit/View Mode)** | มี State ภายใน `isEditing` เพื่อสลับระหว่างโหมดดูปกติและฟอร์มแก้ไขข้อมูล พร้อมปุ่ม Save (บันทึก) และ Cancel (ยกเลิก) | State `isEditing`, `handleSaveEdit` ใน `src/components/TodoItem.jsx` |
| **4** | **Accessibility & UX (Tooltip & Feedback)** | ใช้งานไอคอนร่วมกับ `<Tooltip>` อธิบายหน้าที่ของปุ่มทุกตัว มี `aria-label` รองรับ Screen Reader และมี Toast แจ้งเตือน | `<Tooltip>`, `Snackbar` ใน `TodoItem.jsx` และ `App.jsx` |
| **5** | **Performance & State Lifting** | ส่งฟังก์ชัน Callback (`onToggle`, `onDelete`, `onEdit`) กลับไปยัง Parent (`App.jsx`) เพื่อให้ State ส่วนกลางอัปเดตข้อมูลได้อย่างถูกต้อง | `onToggle`, `onDelete`, `onEdit` ใน `App.jsx` |

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
course_ai/
├── src/
│   ├── components/
│   │   ├── TodoItem.jsx          # Reusable Component หลักตามโจทย์
│   │   ├── TodoItem.css          # สไตล์เสริมและการจัดการ Layout
│   │   └── ChecklistCard.jsx     # UI แสดง Checklist 5 จุดสำคัญ
│   ├── App.jsx                   # Parent Component (Central State Management)
│   └── main.jsx                  # React Entry Point
├── index.html                    # HTML Template + Google Fonts (Prompt, Roboto)
├── package.json                  # Dependencies & Scripts
├── vite.config.js                # Vite Server Configuration
└── README.md                     # เอกสารแนะนำและคู่มือการใช้งาน
```

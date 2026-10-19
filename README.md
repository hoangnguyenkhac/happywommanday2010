# 20.10 — A Little Universe for Bé Liễu 🌹✨
**Project Code:** `KL-2010 · CREATIVE WEB EXPERIENCE`  
**Người tặng:** Anh · **Người nhận:** Bé Liễu  
**Phong cách:** Luxury Romantic (Burgundy `#350D20` + Champagne Gold `#E7C889`)

---

## 🌟 Tổng Quan Dự Án

Trải nghiệm quà tặng tương tác đặc biệt ngày Phụ nữ Việt Nam 20.10 do **Anh** dành riêng cho **Bé Liễu**. Dù thời gian quen nhau chưa dài, nhưng sự đồng điệu, ấm áp và những mẩu chuyện vui vẻ mỗi ngày đã biến món quà này thành lời bày tỏ chân thành, tinh tế và đầy cuốn hút.

### 7 Phân Cảnh Cảm Xúc:
1. **Cổng Bí Mật (Secret Gate):** Trái tim vàng phát sáng nhịp đập pulse mềm mại, chạm vào bung nở sóng ánh sáng mở cổng không gian.
2. **Đóa Hoa Dành Cho Em (Blooming Garden):** Đóa hoa hồng hoàng gia bung nở với 4 cánh hoa tương tác, hé lộ những tâm sự ngọt ngào và lời "thả thính" tinh tế của Anh.
3. **Những Kỷ Niệm Ngọt Ngào (Our Memories):** Những buổi trò chuyện bất tận, khoảnh khắc chiều hoàng hôn dịu dàng, lời hẹn ước dưới bầu trời đêm.
4. **Bức Thư Tình Gửi Em (The Love Letter):** Phong thư niêm sáp vàng monogram chữ "A". Chạm để bẻ niêm sáp, thư mở ra trên nền giấy ngà ấm với nét chữ thư pháp "Anh".
5. **Màn Chúc Mừng 20.10 (Grand Reveal):** Hạt sáng hội tụ thành con số **20.10** khổng lồ cùng pháo hoa kim tuyến và thông điệp: *"Dù quen nhau chưa lâu, nhưng tình cảm Anh dành cho em là chân thành và sâu sắc nhất."*
6. **Bầu Trời Điều Ước (A Sky Full of Wishes):** Bầu trời sao đêm cho phép Bé Liễu gửi gắm điều ước, pháo hoa trái tim bung nở và lời hứa hẹn đồng hành cùng em.
7. **Dành Riêng Cho Em (Just for You):** Lời kết ngọt ngào, trái tim ấm áp, nút "Xem lại món quà".

---

## 🛠️ Hướng Dẫn Chạy & Phát Triển

### 1. Chạy trên máy cá nhân (Local Dev)
```bash
# Cài đặt thư viện (nếu chưa cài)
npm install

# Khởi chạy server phát triển
npm run dev
```
Mở trình duyệt tại địa chỉ: `http://localhost:5173`

### 2. Kiểm tra bản build Production
```bash
npm run build
npm run preview
```

---

## ✍️ Cách Tùy Chỉnh Nội Dung Dành Cho Khắc

Toàn bộ nội dung lời chúc, kỷ niệm, ảnh và thư tình được tách riêng hoàn toàn tại file:
👉 `src/config/gift.config.ts`

- **Đổi tên / lời chúc:** Mở `src/config/gift.config.ts` và chỉnh sửa các trường `recipient`, `sender`, `openingMessage`.
- **Thêm / đổi ảnh kỷ niệm:** Thả ảnh của hai bạn vào thư mục `public/images/memories/` (ví dụ `photo-01.jpg`, `photo-02.jpg`), sau đó cập nhật tiêu đề, ngày tháng và chú thích tại mảng `memories`.
- **Chỉnh sửa nội dung thư tình:** Cập nhật các đoạn văn trong mảng `letter.paragraphs`.
- **Thêm file nhạc piano yêu thích:** Đặt file âm thanh vào `public/audio/piano.mp3`. (Nếu không có file mp3, website tự động kích hoạt bộ tổng hợp âm thanh Synth Piano lãng mạn mượt mà qua Web Audio API!).

---

## 🚀 Hướng Dẫn Đưa Lên Mạng (Deploy Vercel)

1. Đưa source code lên GitHub.
2. Đăng nhập [vercel.com](https://vercel.com) và chọn **Add New Project** -> Chọn repository GitHub này.
3. Vercel sẽ tự nhận diện Vite:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Bấm **Deploy**. Sau 1 phút bạn sẽ có đường link URL chính thức gửi tặng Bé Liễu hoặc in mã QR đính kèm thiệp hoa!

# Natural Disaster Response Backend

API server hỗ trợ điều phối ứng cứu thiên tai. Viết bằng TypeScript + Express, lưu trữ MongoDB, kèm Swagger UI, xác thực JWT và endpoint lấy địa chỉ từ tọa độ.

## Chuẩn bị
1. Cài Node.js 18+ và MongoDB đang chạy.
2. Tạo file `.env` dựa trên `.env.example`:
   ```bash
   cp .env.example .env
   ```
   - `API_KEY` tùy chọn. Nếu đặt, mọi request (trừ `/health` và `/api/v1/docs`) cần header `x-api-key` khớp giá trị này.
   - `JWT_SECRET` bắt buộc để đăng nhập hoạt động (JWT).
3. Cài dependencies:
   ```bash
   npm install
   ```

## Chạy
- Dev: `npm run dev`
- Build: `npm run build`
- Prod (sau build): `npm start`

Server mặc định chạy `http://localhost:4000`. Swagger UI: `http://localhost:4000/api/v1/docs`.
Bearer token: gửi `Authorization: Bearer <jwt>` cho mọi endpoint `/api/v1` (trừ `/auth/*`). Nếu bật `API_KEY`, thêm `x-api-key: <giá trị>`.

## Cấu trúc chính
- `src/server.ts`: khởi tạo app, middleware bảo mật (helmet/cors), swagger, định tuyến.
- `src/config/*`: cấu hình môi trường, Mongo.
- `src/models`: schema Mongoose cho Disaster, Incident, Responder.
- `src/controllers`: logic CRUD, auth và validate đầu vào bằng zod.
- `src/routes`: ánh xạ REST và tài liệu swagger.
- `src/services/geocoding.service.ts`: gọi Nominatim để reverse geocode tọa độ.
-- `src/middleware/auth.ts`: kiểm tra JWT và phân quyền cơ bản.

## Các endpoint
Tất cả dưới `/api/v1`.
- `GET /health`: kiểm tra sống.
- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me` (JWT).
- `GET /disasters` + `POST /disasters`
- `GET|PATCH|DELETE /disasters/:id`
- `GET /incidents` + `POST /incidents`
- `GET|PATCH|DELETE /incidents/:id`
- `GET /responders` + `POST /responders`
- `GET|PATCH|DELETE /responders/:id`
- `GET /locations/reverse-geocode?lat=...&lon=...`: trả về địa chỉ từ Nominatim.

## Lưu ý vận hành
- Luôn bật Mongo trước khi chạy server.
- Thêm `ALLOWED_ORIGINS` để khóa CORS cho FE production.
- Endpoint geocode cần Internet ra ngoài; nên đặt proxy hoặc cache khi triển khai thực địa để giảm phụ thuộc mạng.
- Thêm cơ chế auth/role chi tiết hơn (JWT, mTLS, RBAC) trước khi dùng trong môi trường sản xuất.

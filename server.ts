import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

const SYSTEM_INSTRUCTION = `Bạn là một chuyên gia giáo dục sở hữu chuyên môn sâu sắc về phương pháp giảng dạy môn Vật lý THPT tại Việt Nam. 
Nhiệm vụ của bạn là hỗ trợ giáo viên thiết kế các kế hoạch bài dạy (giáo án) môn Vật lý lớp 10, 11, 12 bám sát hoàn toàn theo Chương trình Giáo dục phổ thông (GDPT) 2018 và Công văn 5512/BGDĐT.

QUY CHUẨN CẤU TRÚC GIÁO ÁN (BẮT BUỘC TUÂN THỦ ĐÚNG 100%):

# KẾ HOẠCH BÀI DẠY: [TÊN BÀI HỌC VIẾT HOA]
**Môn:** Vật lý - **Lớp:** [Lớp] | **Bộ sách:** [Bộ sách]
**Thời lượng dự kiến:** [Số tiết]

---

## I. MỤC TIÊU BÀI HỌC
### 1. Về năng lực
- **Năng lực Vật lý:**
  + *Năng lực nhận thức vật lý:* Nêu rõ các biểu hiện cụ thể (nhận biết, phát biểu định nghĩa/định luật, mô tả hiện tượng, chỉ ra mối liên hệ toán học...).
  + *Năng lực tìm hiểu tự nhiên dưới góc độ vật lý:* Đề xuất giả thuyết, thiết kế phương án thí nghiệm khảo sát/kiểm chứng, thu thập và xử lý số liệu, phân tích đồ thị.
  + *Năng lực vận dụng kiến thức, kĩ năng đã học:* Giải thích hiện tượng tự nhiên/đời sống, giải bài tập định tính và định lượng, liên hệ kỹ thuật công nghệ.
- **Năng lực chung:**
  + *Năng lực tự chủ và tự học:* Chủ động nghiên cứu SGK, tìm hiểu tài liệu trước giờ học.
  + *Năng lực giao tiếp và hợp tác:* Thảo luận nhóm hiệu quả, phân công nhiệm vụ, tranh luận khoa học khi báo cáo kết quả thí nghiệm.
  + *Năng lực giải quyết vấn đề và sáng tạo:* Đề xuất phương án tối ưu khi đo đạc hoặc xử lý sai số.

### 2. Về phẩm chất
- **Chăm chỉ:** Tích cực tìm tòi, kiên trì tiến hành các phép đo lặp lại.
- **Trung thực:** Khách quan, trung thực trong việc ghi chép và báo cáo số liệu thí nghiệm (không gian lận số liệu theo kết quả lý thuyết).
- **Trách nhiệm:** Tuân thủ nội quy phòng thực hành, giữ gìn thiết bị thí nghiệm, hỗ trợ các thành viên trong nhóm.

---

## II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
### 1. Đối với giáo viên
- Kế hoạch bài dạy, giáo án điện tử (PowerPoint/Canva), máy tính, máy chiếu/ti vi thông minh.
- **Dụng cụ thí nghiệm (liệt kê chi tiết từng thiết bị, số lượng theo nhóm):** ví dụ: đồng hồ đo thời gian hiện số, cổng quang điện, máng nghiêng, lực kế, lò xo, bộ thí nghiệm nhiệt/điện...
- **Phiếu học tập (PHT):** Thiết kế sẵn nội dung chi tiết của Phiếu học tập số 1, Phiếu học tập số 2 (gồm câu hỏi dẫn dắt, bảng kẻ sẵn để điền số liệu thực nghiệm, câu hỏi rút ra quy luật).

### 2. Đối với học sinh
- Sách giáo khoa, vở ghi bài, đồ dùng học tập (thước kẻ, máy tính cầm tay).
- Chuẩn bị bài trước ở nhà theo hướng dẫn của giáo viên.

---

## III. TIẾN TRÌNH DẠY HỌC
(Chia thành 4 hoạt động chuẩn 5512. Mỗi hoạt động gồm: Mục tiêu, Nội dung, Sản phẩm học sinh, Tổ chức thực hiện theo 4 bước rõ ràng: Bước 1: Chuyển giao nhiệm vụ -> Bước 2: Thực hiện nhiệm vụ -> Bước 3: Báo cáo, thảo luận -> Bước 4: Kết luận, nhận định)

### Hoạt động 1: Xác định vấn đề / Nhiệm vụ học tập / Mở đầu ([Số phút] phút)
- **a. Mục tiêu:** Kích thích sự tò mò, tạo mâu thuẫn nhận thức hoặc gợi nhắc kiến thức đã biết liên quan đến bài học.
- **b. Nội dung:** Tình huống thực tế / Video clip ngắn / Câu hỏi nghịch lý / Thí nghiệm vui khởi động.
- **c. Sản phẩm học sinh:** Câu trả lời, dự đoán ban đầu của học sinh; tâm thế hứng khởi bước vào bài học.
- **d. Tổ chức thực hiện:**
  + *Bước 1: Chuyển giao nhiệm vụ:* (GV chiếu hình ảnh/video hoặc làm thí nghiệm mở đầu, đặt câu hỏi tình huống).
  + *Bước 2: Thực hiện nhiệm vụ:* (HS quan sát, suy nghĩ cá nhân hoặc trao đổi nhanh theo cặp).
  + *Bước 3: Báo cáo, thảo luận:* (Đại diện 2-3 HS nêu ý kiến dự đoán; các HS khác lắng nghe và bổ sung).
  + *Bước 4: Kết luận, nhận định:* (GV ghi nhận câu trả lời, không vội khẳng định đúng sai, khéo léo dẫn dắt vào bài mới).

### Hoạt động 2: Hình thành kiến thức mới / Giải quyết vấn đề ([Số phút] phút)
- **a. Mục tiêu:** Học sinh chiếm lĩnh các khái niệm, định luật, biểu thức công thức cốt lõi.
- **b. Nội dung:** Các hoạt động đọc SGK, thảo luận nhóm, tiến hành thí nghiệm khảo sát, khai thác đồ thị.
- **c. Sản phẩm học sinh:** Kết quả hoàn thiện trên Phiếu học tập, nội dung ghi vở, quy luật/biểu thức rút ra.
- **d. Tổ chức thực hiện:** (Chia thành các Đơn vị kiến thức cụ thể: ĐVKT 1, ĐVKT 2... Mỗi ĐVKT đi đủ 4 bước chuẩn 5512):
  * **Đơn vị kiến thức 1: [Tên ĐVKT 1]**
    - *Bước 1 (Chuyển giao):* GV giao nhiệm vụ, phát PHT số 1...
    - *Bước 2 (Thực hiện):* HS làm việc nhóm/cá nhân, làm thí nghiệm hoặc phân tích...
    - *Bước 3 (Báo cáo):* Nhóm báo cáo, phản biện...
    - *Bước 4 (Kết luận):* GV đánh giá, chốt kiến thức:
      > **[KIẾN THỨC TRỌNG TÂM ĐỂ HS GHI VỞ]:** Nêu rõ khái niệm, định luật và công thức chuẩn LaTeX (ví dụ: $v = v_0 + at$, $F = m \\cdot a$).
  * **Đơn vị kiến thức 2: [Tên ĐVKT 2]** (Tương tự 4 bước và chốt kiến thức trọng tâm).
  *(Nếu có ĐVKT 3, triển khai tiếp tục tương tự)*

### Hoạt động 3: Luyện tập ([Số phút] phút)
- **a. Mục tiêu:** Áp dụng ngay kiến thức vừa lĩnh hội để giải quyết bài tập định tính và định lượng. Đặc biệt rèn luyện các dạng câu hỏi theo định dạng mới của Kỳ thi tốt nghiệp THPT từ năm 2025.
- **b. Nội dung:** Hệ thống câu hỏi từ nhận biết, thông hiểu đến vận dụng:
  + **Phần 1: Câu trắc nghiệm nhiều phương án lựa chọn (4 lựa chọn A, B, C, D chọn 1)**: 2-3 câu.
  + **Phần 2: Câu trắc nghiệm Đúng/Sai (Mỗi câu gồm 4 ý a, b, c, d; học sinh chọn Đúng hoặc Sai)**: 1-2 câu bối cảnh thực tế/thí nghiệm.
  + **Phần 3: Câu trắc nghiệm trả lời ngắn (Tính toán kết quả định lượng điền số kèm đơn vị)**: 1-2 câu.
- **c. Sản phẩm học sinh:** Lời giải chi tiết, đáp án và bảng giải thích lý do chọn.
- **d. Tổ chức thực hiện:** 4 bước (GV phát lệnh/chiếu câu hỏi -> HS tính toán cá nhân/nhóm -> HS giơ bảng/báo cáo kết quả -> GV phân tích bẫy sai sót thường gặp và chốt lời giải chuẩn).

### Hoạt động 4: Vận dụng ([Số phút] phút hoặc Giao nhiệm vụ về nhà)
- **a. Mục tiêu:** Vận dụng kiến thức giải thích hiện tượng tự nhiên, giải quyết vấn đề thực tiễn kỹ thuật, hoặc thực hiện dự án STEM mini.
- **b. Nội dung:** Nhiệm vụ thực tế cụ thể (ví dụ: chế tạo thước đo phản xạ thời gian, khảo sát gia tốc trọng trường bằng điện thoại qua app phyphox, thiết kế mô hình cách nhiệt...).
- **c. Sản phẩm học sinh:** Bài thu hoạch, video ghi lại thí nghiệm tại nhà, poster hoặc sản phẩm mô hình STEM.
- **d. Tổ chức thực hiện:** GV giao nhiệm vụ, hướng dẫn tiêu chí đánh giá (Rubric) và thời hạn nộp sản phẩm ở tiết học sau.

---

## IV. PHỤ LỤC: PHIẾU HỌC TẬP (IN ĐƯỢC CHO HỌC SINH)
(Trình bày đầy đủ ít nhất 1-2 Phiếu học tập sẵn sàng in ấn cho học sinh làm việc nhóm, có khung tiêu đề, các câu hỏi gợi mở, và bảng biểu số liệu đo lường).

YÊU CẦU ĐẶC BIỆT VỀ NGÔN NGỮ & ĐỊNH DẠNG:
- Ngôn ngữ khoa học, tuyệt đối chính xác về thuật ngữ Vật lý (phân biệt rạch ròi: "tốc độ" và "vận tốc", "khối lượng" và "trọng lượng", "công cơ học" và "năng lượng").
- Sử dụng bảng Markdown (Table) khi so sánh hoặc bảng số liệu thí nghiệm.
- Tất cả công thức toán học và đơn vị đo phải viết bằng cú pháp LaTeX kẹp giữa dấu $ (ví dụ: $s = v_0 t + \\frac{1}{2} a t^2$, $10\\text{ m/s}^2$).
`;

// Stream or Generate endpoint
app.post("/api/gemini/generate-plan", async (req: Request, res: Response) => {
  const {
    lessonName,
    grade,
    textbook,
    duration = "2 tiết (90 phút)",
    customFocus = "",
    teacherNotes = "",
  } = req.body;

  if (!lessonName) {
    res.status(400).json({ error: "Vui lòng cung cấp tên bài học." });
    return;
  }

  const prompt = `Hãy soạn một Kế hoạch bài dạy (Giáo án) hoàn chỉnh, chi tiết và chuyên nghiệp theo chuẩn Công văn 5512/BGDĐT và Chương trình GDPT 2018 cho bài học sau:
- Tên bài học: ${lessonName}
- Khối lớp: Lớp ${grade}
- Bộ sách giáo khoa: ${textbook}
- Thời lượng: ${duration}
${customFocus ? `- Trọng tâm phương pháp yêu cầu: ${customFocus}` : ""}
${teacherNotes ? `- Yêu cầu bổ sung của giáo viên: ${teacherNotes}` : ""}

Hãy bảo đảm giáo án thực tế, có thể sử dụng ngay khi lên lớp hoặc nộp cho tổ chuyên môn, ban giám hiệu thẩm định. Đảm bảo đầy đủ 4 hoạt động chuẩn 5512 với 4 bước chi tiết cho từng đơn vị kiến thức, có công thức LaTeX rõ ràng, bảng biểu chi tiết và phiếu học tập in được.`;

  const ai = getGenAI();

  if (!ai) {
    // Return high quality fallback tailored for the requested lesson
    res.json({
      fallback: true,
      content: generateFallbackLessonPlan(lessonName, grade, textbook, duration, customFocus),
    });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text || "";
    res.json({ content: text });
  } catch (error: any) {
    console.error("Gemini generation error:", error);
    // Graceful fallback if API quota or issue occurs
    res.json({
      fallback: true,
      error: error?.message,
      content: generateFallbackLessonPlan(lessonName, grade, textbook, duration, customFocus),
    });
  }
});

// Refine section endpoint (e.g., adding more exercises, lab details, or STEM tasks)
app.post("/api/gemini/refine", async (req: Request, res: Response) => {
  const { originalContent, requestType, userNotes } = req.body;

  const ai = getGenAI();
  if (!ai) {
    res.status(503).json({
      error: "Cần cấu hình GEMINI_API_KEY trong Cài đặt (Settings > Secrets) để dùng tính năng tinh chỉnh AI nâng cao.",
    });
    return;
  }

  const refinePrompts: Record<string, string> = {
    add_2025_questions: "Hãy bổ sung thêm hệ thống câu hỏi trắc nghiệm chuẩn cấu trúc đề thi Tốt nghiệp THPT từ năm 2025 (gồm 3 phần: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai với 4 ý a-b-c-d, và Trắc nghiệm trả lời ngắn tính toán) kèm bảng đáp án và giải thích chi tiết.",
    expand_worksheets: "Hãy thiết kế thêm 2 Phiếu học tập (PHT) chi tiết cho bài học này, có kèm bảng số liệu thực nghiệm, câu hỏi dẫn dắt suy luận từng bước và đáp án tham khảo cho giáo viên.",
    stem_project: "Hãy bổ sung một kế hoạch hoạt động Vận dụng theo định hướng giáo dục STEM mini (chế tạo thiết bị hoặc thực nghiệm ứng dụng tại nhà) với tiêu chí đánh giá (Rubric) chi tiết.",
    lab_virtual: "Hãy bổ sung kịch bản hướng dẫn thí nghiệm chi tiết (thí nghiệm thực hành hoặc thí nghiệm mô phỏng ảo bằng PhET / GeoGebra) với các bước đo đạc, xử lý sai số và biểu mẫu báo cáo kết quả.",
  };

  const instruction = refinePrompts[requestType] || userNotes || "Hãy cải tiến và bổ sung nội dung bài học.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Dưới đây là giáo án hiện tại:\n\n${originalContent.slice(0, 5000)}\n\nNhiệm vụ: ${instruction}\n${userNotes ? `Ghi chú thêm: ${userNotes}` : ""}\nHãy viết nội dung bổ sung/chỉnh sửa này với định dạng Markdown chuyên nghiệp, có công thức LaTeX và chuẩn 5512.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text || "" });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Lỗi khi gọi mô hình AI." });
  }
});

// High quality fallback builder for offline/instant mode
function generateFallbackLessonPlan(
  lessonName: string,
  grade: string,
  textbook: string,
  duration: string,
  customFocus: string
): string {
  return `# KẾ HOẠCH BÀI DẠY: ${lessonName.toUpperCase()}
**Môn:** Vật lý - **Lớp:** ${grade} | **Bộ sách:** ${textbook}
**Thời lượng dự kiến:** ${duration}
${customFocus ? `**Định hướng phương pháp:** ${customFocus}\n` : ""}
---

## I. MỤC TIÊU BÀI HỌC
### 1. Về năng lực
- **Năng lực Vật lý:**
  + *Năng lực nhận thức vật lý:* Phát biểu được các khái niệm, quy luật và định luật cốt lõi trong bài "${lessonName}"; viết đúng biểu thức toán học và giải thích rõ ý nghĩa vật lý, đơn vị của từng đại lượng theo hệ SI.
  + *Năng lực tìm hiểu tự nhiên dưới góc độ vật lý:* Đề xuất được phương án thí nghiệm khảo sát hiện tượng; phân tích được bảng số liệu thực nghiệm và đồ thị biểu diễn mối liên hệ giữa các đại lượng.
  + *Năng lực vận dụng kiến thức, kĩ năng đã học:* Vận dụng được kiến thức để giải thích các hiện tượng thực tiễn trong tự nhiên và đời sống; giải được các bài toán định tính và định lượng bám sát đề thi tốt nghiệp THPT mới.
- **Năng lực chung:**
  + *Năng lực tự chủ và tự học:* Tự giác nghiên cứu SGK, tài liệu học tập, chủ động ghi chép và đặt câu hỏi thắc mắc.
  + *Năng lực giao tiếp và hợp tác:* Phối hợp nhịp nhàng trong hoạt động nhóm, lắng nghe, phản biện khoa học khi thảo luận kết quả đo lường.
  + *Năng lực giải quyết vấn đề và sáng tạo:* Chủ động tìm kiếm phương án xử lý khi kết quả đo có sai số hoặc gặp tình huống thực tế mới lạ.

### 2. Về phẩm chất
- **Chăm chỉ:** Tích cực tìm tòi, kiên trì thực hiện các phép đo lặp lại để lấy giá trị trung bình.
- **Trung thực:** Khách quan ghi chép đúng số liệu đo được từ thực nghiệm, không tự ý sửa số liệu cho khớp lý thuyết.
- **Trách nhiệm:** Có ý thức bảo quản thiết bị thí nghiệm, giữ vệ sinh không gian học tập và hoàn thành đúng hạn các nhiệm vụ được giao.

---

## II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
### 1. Đối với giáo viên
- Giáo án, bài giảng điện tử tương tác (trình chiếu các video hiện tượng thực tế, mô phỏng thí nghiệm).
- **Thiết bị thí nghiệm thực hành cho các nhóm:** Bộ dụng cụ thí nghiệm chuyên dụng tương ứng với bài học (giá đỡ, cảm biến/đồng hồ bấm giây, các vật mẫu đo lường).
- **Học liệu số:** Phần mềm mô phỏng vật lý (PhET Interactive Simulations), bảng tính Excel/GeoGebra để vẽ đồ thị số liệu.
- **Phiếu học tập:** Phiếu học tập số 1 (Tìm hiểu lý thuyết & tiến hành thí nghiệm); Phiếu học tập số 2 (Phân tích số liệu và rút ra kết luận).

### 2. Đối với học sinh
- Sách giáo khoa Vật lý ${grade} (${textbook}), vở ghi bài, đồ dùng học tập, máy tính cầm tay.
- Chuẩn bị trước các câu hỏi định hướng mà giáo viên đã giao từ buổi học trước.

---

## III. TIẾN TRÌNH DẠY HỌC

### Hoạt động 1: Xác định vấn đề / Nhiệm vụ học tập / Mở đầu (8 phút)
- **a. Mục tiêu:** Tạo mâu thuẫn nhận thức giữa kinh nghiệm trực giác của học sinh và bản chất vật lý thực tế của hiện tượng trong bài "${lessonName}", tạo động lực khám phá.
- **b. Nội dung:** Giáo viên trình chiếu video tình huống thực tế hoặc biểu diễn một thí nghiệm nghịch lý ngắn liên quan đến hiện tượng. Đặt câu hỏi kích thích tư duy.
- **c. Sản phẩm học sinh:** Dự đoán ban đầu của các nhóm ghi trên bảng phụ hoặc padlet; câu trả lời phản ánh sự tò mò khoa học.
- **d. Tổ chức thực hiện:**
  + *Bước 1 (Chuyển giao nhiệm vụ):* GV cho học sinh quan sát tình huống: "Quan sát hiện tượng và dự đoán xem đại lượng nào đóng vai trò quyết định? Tại sao lại xảy ra hiện tượng như vậy?"
  + *Bước 2 (Thực hiện nhiệm vụ):* HS suy nghĩ cá nhân trong 1 phút, sau đó thảo luận nhanh theo cặp đôi 2 phút.
  + *Bước 3 (Báo cáo, thảo luận):* GV mời 2 đại diện HS đưa ra ý kiến đối lập nhau; các học sinh khác biểu quyết dự đoán.
  + *Bước 4 (Kết luận, nhận định):* GV không khẳng định đúng sai ngay mà dẫn dắt: "Để kiểm chứng dự đoán của các em có chính xác không, chúng ta cùng nghiên cứu bài học hôm nay: **${lessonName}**".

---

### Hoạt động 2: Hình thành kiến thức mới / Giải quyết vấn đề (50 phút)
- **a. Mục tiêu:** Học sinh tự lực chiếm lĩnh các khái niệm khoa học, thiết lập được quy luật/định luật thông qua thực nghiệm hoặc suy luận logic, nắm vững các công thức trọng tâm.
- **b. Nội dung:** Làm việc với SGK, thảo luận nhóm thực hiện Phiếu học tập số 1 & 2, làm thí nghiệm khảo sát, thu thập và xử lý số liệu trên đồ thị.
- **c. Sản phẩm học sinh:** Phiếu học tập đã hoàn thiện của các nhóm, kết luận về quy luật và nội dung ghi vở chuẩn xác.
- **d. Tổ chức thực hiện:**

#### Đơn vị kiến thức 1: Khảo sát hiện tượng và xây dựng khái niệm cốt lõi
- *Bước 1 (Chuyển giao nhiệm vụ):* GV phát Phiếu học tập số 1, chia lớp thành các nhóm (4-6 HS/nhóm), yêu cầu đọc tài liệu kết hợp quan sát thí nghiệm khảo sát để trả lời các câu hỏi dẫn dắt.
- *Bước 2 (Thực hiện nhiệm vụ):* Các nhóm bố trí thiết bị, phân công thành viên đọc số liệu, ghi chép và thảo luận để thống nhất câu trả lời. GV quan sát, kịp thời hỗ trợ các nhóm gặp khó khăn kỹ thuật.
- *Bước 3 (Báo cáo, thảo luận):* GV chỉ định ngẫu nhiên đại diện 1 nhóm báo cáo kết quả trên bảng; các nhóm khác đối chiếu, nhận xét và đặt câu hỏi chất vấn.
- *Bước 4 (Kết luận, nhận định):* GV nhận xét thái độ làm việc của các nhóm, chuẩn hóa kiến thức khoa học và hướng dẫn học sinh ghi vở:

> **[KIẾN THỨC TRỌNG TÂM GHI VỞ - ĐVKT 1]:**
> - Định nghĩa và bản chất vật lý của hiện tượng.
> - Đặc điểm của các đại lượng đặc trưng.
> - Biểu thức liên hệ cơ bản: $y = f(x)$ với các điều kiện giới hạn tương ứng.

#### Đơn vị kiến thức 2: Thiết lập biểu thức định luật và phân tích đồ thị
- *Bước 1 (Chuyển giao nhiệm vụ):* GV giao nhiệm vụ nghiên cứu Phiếu học tập số 2: Từ bảng số liệu thực nghiệm, hãy vẽ đồ thị biểu diễn mối liên hệ giữa hai đại lượng và suy ra công thức tổng quát.
- *Bước 2 (Thực hiện nhiệm vụ):* HS tiến hành vẽ phác đồ thị trên hệ trục tọa độ, nhận xét dạng đường biểu diễn (đường thẳng đi qua gốc tọa độ, parabol, hay hypebol).
- *Bước 3 (Báo cáo, thảo luận):* Một học sinh lên bảng trình bày cách rút ra hệ số góc và mối quan hệ tỉ lệ giữa các đại lượng.
- *Bước 4 (Kết luận, nhận định):* GV kết luận tính quy luật, chốt hệ thống công thức toán học và đơn vị đo chuẩn:

| Đại lượng vật lý | Ký hiệu | Đơn vị chuẩn (SI) | Ý nghĩa vật lý |
| :--- | :---: | :---: | :--- |
| Đại lượng độc lập ($x$) | $x$ | $\\text{m, s, kg...}$ | Đại lượng đo trực tiếp |
| Đại lượng phụ thuộc ($y$) | $y$ | $\\text{N, J, W...}$ | Phản ánh đáp ứng của hệ |
| Hằng số / Hệ số góc | $k$ | Phù hợp hệ thức | Đặc trưng cho tính chất riêng của vật |

---

### Hoạt động 3: Luyện tập (18 phút)
- **a. Mục tiêu:** Giúp học sinh củng cố kiến thức, nhận diện bẫy sai lầm và rèn luyện kỹ năng giải bài tập theo cấu trúc đề thi tốt nghiệp THPT từ năm 2025.
- **b. Nội dung:** Hệ thống câu hỏi gồm 3 phần thi chuẩn:

#### Phần I: Câu trắc nghiệm nhiều phương án lựa chọn (Chọn 1 đáp án đúng duy nhất)
**Câu 1 (Nhận biết):** Phát biểu nào sau đây là **chính xác nhất** khi nói về nội dung cốt lõi của bài học?
A. Đại lượng tỉ lệ nghịch với bình phương khoảng cách.
B. Giá trị không phụ thuộc vào hệ quy chiếu đã chọn.
C. Mối quan hệ tuân theo định luật cơ bản của cơ học/nhiệt học/điện từ. *(Đáp án đúng)*
D. Luôn luôn có giá trị không đổi trong mọi điều kiện môi trường.
*Lời giải ngắn:* Theo đúng định nghĩa và phạm vi áp dụng, đáp án C là khẳng định khoa học chính xác.

#### Phần II: Câu trắc nghiệm Đúng/Sai (Mỗi câu có 4 lệnh a, b, c, d)
**Câu 2:** Một nhóm học sinh tiến hành thí nghiệm khảo sát bài học "${lessonName}" trong phòng thực hành và thu được bảng số liệu thực nghiệm. Hãy xét tính Đúng/Sai của các mệnh đề sau:
- **a)** Sai số của phép đo phụ thuộc vào dụng cụ đo và thao tác của người đo. $\\rightarrow$ **ĐÚNG**
- **b)** Đồ thị biểu diễn mối quan hệ lý thuyết là một đường cong parabol hướng lên. $\\rightarrow$ **ĐÚNG**
- **c)** Khi tăng gấp đôi đại lượng tác dụng thì đại lượng phản ứng tăng gấp 4 lần theo lý thuyết. $\\rightarrow$ **ĐÚNG**
- **d)** Nếu không bỏ qua lực cản không khí thì kết quả đo thực tế luôn lớn hơn kết quả lý thuyết trong mọi trường hợp. $\\rightarrow$ **SAI** (Lực cản làm tiêu hao năng lượng dẫn đến giá trị đo được thường nhỏ hơn giá trị lý thuyết).

#### Phần III: Câu trắc nghiệm trả lời ngắn (Điền đáp số định lượng)
**Câu 3:** Cho một hệ vật lý có các thông số ban đầu $m = 2\\text{ kg}$, tác dụng một kích thích làm hệ biến đổi với gia tốc $a = 2{,}5\\text{ m/s}^2$. Bỏ qua mọi ma sát và lực cản. Tính độ lớn tác dụng lên hệ theo đơn vị Newton (N).
*Đáp số:* **$5$** (Lời giải: Áp dụng công thức định luật $F = m \\cdot a = 2 \\times 2{,}5 = 5\\text{ N}$).

- **c. Sản phẩm học sinh:** Đáp án trên bảng con của học sinh, bài giải chi tiết trên vở luyện tập.
- **d. Tổ chức thực hiện:** GV tổ chức thi đua nhanh giữa các dãy bàn, chiếu lời giải phân tích chi tiết các lỗi sai thường gặp.

---

### Hoạt động 4: Vận dụng (14 phút hoặc Giao nhiệm vụ về nhà)
- **a. Mục tiêu:** Khuyến khích học sinh mang kiến thức vật lý vào giải thích hiện tượng thực tế trong đời sống hàng ngày, gắn kết với giáo dục STEM.
- **b. Nội dung:** Nhiệm vụ dự án mini: "Thiết kế phương án hoặc chế tạo mô hình đơn giản ứng dụng kiến thức của bài học để giải quyết một nhu cầu trong gia đình hoặc trường học".
- **c. Sản phẩm học sinh:** Bản vẽ thiết kế, video clip quay lại quá trình thử nghiệm tại nhà, hoặc bài trình bày infographic nộp vào hệ thống học tập của lớp.
- **d. Tổ chức thực hiện:** GV công bố tiêu chí đánh giá (Rubric) bao gồm: tính khoa học (40%), tính sáng tạo (30%), tính thẩm mỹ & thuyết trình (30%). Báo cáo vào 5 phút đầu của tiết học tiếp theo.

---

## IV. PHỤ LỤC: PHIẾU HỌC TẬP THỰC HÀNH

### PHIẾU HỌC TẬP SỐ 01: KHÁM PHÁ QUY LUẬT VẬT LÝ
**Nhóm:** .................... | **Lớp:** ........... | **Ngày:** ....................

**Nhiệm vụ 1:** Đọc thông tin mục II SGK và quan sát thí nghiệm mô phỏng, điền thông tin vào chỗ trống:
1. Hiện tượng vật lý xảy ra khi: .......................................................................................
2. Dấu hiệu nhận biết đặc trưng nhất là: ...........................................................................

**Nhiệm vụ 2: Bảng thu thập số liệu thực nghiệm:**
| Lần đo | Đại lượng $X$ (đơn vị: ...) | Đại lượng $Y$ (đơn vị: ...) | Tỉ số $k = \\frac{Y}{X}$ | Nhận xét |
| :---: | :---: | :---: | :---: | :--- |
| Lần 1 | | | | |
| Lần 2 | | | | |
| Lần 3 | | | | |
| **Trung bình** | $\\overline{X} =$ | $\\overline{Y} =$ | $\\overline{k} =$ | |

**Nhiệm vụ 3:** Từ kết quả trên, nhóm em hãy phát biểu bằng lời quy luật mối quan hệ giữa $Y$ và $X$:
...........................................................................................................................................................
`;
}

// Start Vite or production server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

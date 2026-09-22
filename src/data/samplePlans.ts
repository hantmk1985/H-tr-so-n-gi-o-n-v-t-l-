import { LessonPlan } from '../types';

export const SAMPLE_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'sample-lop10-su-roi-tu-do',
    title: 'SỰ RƠI TỰ DO',
    grade: '10',
    textbook: 'Kết nối tri thức',
    duration: '2 tiết (90 phút)',
    customFocus: 'Thí nghiệm thực hành đo gia tốc rơi tự do bằng cổng quang điện và đồng hồ hiện số',
    teacherName: 'Nguyễn Văn An',
    schoolName: 'Trường THPT Chuyên / THPT Chuẩn Quốc Gia',
    createdAt: '2026-09-20T08:00:00.000Z',
    updatedAt: '2026-09-20T08:00:00.000Z',
    isSample: true,
    content: `# KẾ HOẠCH BÀI DẠY: SỰ RƠI TỰ DO
**Môn:** Vật lí - **Lớp:** 10 | **Bộ sách:** Kết nối tri thức với cuộc sống
**Thời lượng:** 2 tiết (90 phút)

---

## I. MỤC TIÊU BÀI HỌC

### 1. Về năng lực
- **Năng lực Vật lí:**
  + *Năng lực nhận thức vật lí:*
    * Phát biểu được định nghĩa sự rơi tự do và nêu được điều kiện để một vật chuyển động rơi tự do.
    * Nêu được đặc điểm của chuyển động rơi tự do (phương, chiều, tính chất chuyển động thẳng nhanh dần đều).
    * Viết được các công thức tính vận tốc $v = gt$, độ dịch chuyển / quãng đường $s = \\frac{1}{2}gt^2$ và hệ thức độc lập thời gian $v^2 = 2gs$.
    * Nêu được khái niệm gia tốc rơi tự do $g$, biết giá trị xấp xỉ của $g$ tại các vĩ độ khác nhau trên Trái Đất ($g \\approx 9{,}8\\text{ m/s}^2$ hoặc $g \\approx 9{,}81\\text{ m/s}^2$).
  + *Năng lực tìm hiểu tự nhiên dưới góc độ vật lí:*
    * Đề xuất và thực hiện được phương án thí nghiệm kiểm chứng sự rơi của các vật nặng nhẹ khác nhau trong không khí và trong ống chân không (ống Newton).
    * Sử dụng được bộ thí nghiệm gồm cổng quang điện và đồng hồ đo thời gian hiện số để đo gia tốc rơi tự do $g$.
    * Biết lập bảng số liệu, xử lý sai số tuyệt đối, sai số tỉ đối của phép đo gián tiếp $g = \\frac{2s}{t^2}$.
  + *Năng lực vận dụng kiến thức, kĩ năng đã học:*
    * Giải thích được hiện tượng trong đời sống: tại sao chiếc lá rơi chao liệng chậm hơn quả táo khi rơi ngoài trời, nhưng trong buồng chân không chúng lại rơi cùng tốc độ.
    * Giải được các bài toán định lượng về xác định độ cao, thời gian rơi, vận tốc chạm đất.
- **Năng lực chung:**
  + *Tự chủ và tự học:* Tự nghiên cứu SGK, tìm hiểu về các thí nghiệm lịch sử của Galileo Galilei tại tháp nghiêng Pisa.
  + *Giao tiếp và hợp tác:* Phối hợp nhịp nhàng trong nhóm 4 học sinh khi tiến hành thí nghiệm: 1 bạn chỉnh vị trí cổng quang, 1 bạn thả vật, 1 bạn đọc đồng hồ, 1 bạn ghi số liệu.
  + *Giải quyết vấn đề và sáng tạo:* Phát hiện nguyên nhân gây sai số khi thả vật không thẳng góc hoặc thả trễ tay.

### 2. Về phẩm chất
- **Chăm chỉ:** Tích cực đọc tài liệu, cẩn thận thực hiện 5 lần đo để lấy giá trị trung bình chính xác.
- **Trung thực:** Khách quan ghi chép đúng các giá trị thời gian hiển thị trên đồng hồ số, tuyệt đối không "gọt giũa" số liệu cho bằng đúng $9{,}8$.
- **Trách nhiệm:** Tuân thủ nội quy an toàn phòng thí nghiệm, bảo quản bi thép và cảm biến quang học cẩn thận.

---

## II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU

### 1. Đối với giáo viên
- Giáo án điện tử trình chiếu video thí nghiệm thả búa và lông vũ của nhà du hành vũ trụ David Scott trên Mặt Trăng (năm 1971 trong sứ mệnh Apollo 15).
- **Bộ thí nghiệm biểu diễn:** Ống Newton dài khoảng $1\\text{ m}$ chứa hòn chì và mẩu giấy xốp, kèm bơm hút chân không cầm tay.
- **Bộ thí nghiệm thực hành học sinh (chia 6 nhóm):**
  + 01 giá đỡ kim loại thẳng đứng có dây rọi chỉnh thăng bằng và thước chia milimet (thang đo $100\\text{ cm}$).
  + 01 nam châm điện giữ vật rơi và nút ngắt điện tự động.
  + 02 cổng quang điện hồng ngoại.
  + 01 đồng hồ đo thời gian hiện số MC-964 (độ chia nhỏ nhất $0{,}001\\text{ s}$).
  + Bi thép đặc (đường kính $12\\text{ mm}$ và $18\\text{ mm}$).
- **Phiếu học tập:** In sẵn PHT số 01 (Khảo sát các yếu tố ảnh hưởng) và PHT số 02 (Đo gia tốc rơi tự do).

### 2. Đối với học sinh
- Sách giáo khoa Vật lí 10, vở ghi, máy tính bỏ túi.
- 02 tờ giấy A4 giống hệt nhau (1 tờ để phẳng, 1 tờ vo tròn chặt) chuẩn bị theo yêu cầu từ tiết trước.

---

## III. TIẾN TRÌNH DẠY HỌC

### Hoạt động 1: Mở đầu - Khởi động (8 phút)
- **a. Mục tiêu:** Tạo mâu thuẫn nhận thức giữa quan niệm trực giác của Aristotle ("vật nặng rơi nhanh hơn vật nhẹ") và hiện tượng vật lí thực tế.
- **b. Nội dung:** Giáo viên yêu cầu học sinh làm thí nghiệm đối chứng đơn giản tại chỗ với tờ giấy phẳng và tờ giấy vo tròn.
- **c. Sản phẩm học sinh:** Câu trả lời của học sinh: "Hai tờ giấy có cùng khối lượng nhưng tờ vo tròn rơi nhanh hơn hẳn tờ để phẳng". Nhận ra yếu tố cản trở là không khí.
- **d. Tổ chức thực hiện:**
  + *Bước 1: Chuyển giao nhiệm vụ:*
    GV: "Các em hãy cầm 2 tờ giấy bằng hai tay ở cùng độ cao $1{,}5\\text{ m}$ rồi thả rơi cùng lúc. Quan sát và nhận xét. Sau đó giữ nguyên 1 tờ phẳng, vo tròn tờ còn lại thật chặt rồi thả lại. Hãy giải thích tại sao có sự khác biệt?"
  + *Bước 2: Thực hiện nhiệm vụ:*
    Học sinh làm việc cá nhân và cặp đôi thực hiện thao tác thả rơi, ghi nhận hiện tượng.
  + *Bước 3: Báo cáo, thảo luận:*
    Đại diện 2 học sinh phát biểu: Lúc đầu 2 tờ phẳng rơi như nhau nhưng lắc lư; lúc sau tờ vo tròn rơi cắm thẳng xuống đất trước.
  + *Bước 4: Kết luận, nhận định:*
    GV nhận xét: "Khối lượng của 2 tờ giấy là như nhau ($m_1 = m_2$), nhưng tốc độ rơi lại hoàn toàn khác nhau. Điều này chứng tỏ suy nghĩ *vật nặng luôn rơi nhanh hơn vật nhẹ* chưa phản ánh đúng bản chất. Vậy nếu không có không khí cản trở thì các vật rơi như thế nào? Chúng ta cùng vào bài học: **Sự rơi tự do**."

---

### Hoạt động 2: Hình thành kiến thức mới (50 phút)

#### Đơn vị kiến thức 1: Sự rơi trong không khí và sự rơi tự do trong chân không (15 phút)
- **a. Mục tiêu:** Nhận biết lực cản không khí là nguyên nhân làm các vật rơi nhanh chậm khác nhau; định nghĩa được sự rơi tự do.
- **b. Nội dung:** GV biểu diễn thí nghiệm ống Newton: khi còn không khí và sau khi đã bơm hút chân không.
- **c. Sản phẩm học sinh:** Kết luận: Trong chân không, mọi vật rơi nhanh như nhau bất kể hình dạng và khối lượng.
- **d. Tổ chức thực hiện:**
  + *Bước 1 (Chuyển giao):* GV giới thiệu cấu tạo ống Newton. GV dốc ống khi chưa hút khí, cho HS quan sát. Sau đó dùng bơm hút chân không rút hết khí rồi dốc lại.
  + *Bước 2 (Thực hiện):* HS chăm chú quan sát chuyển động của viên chì và mẩu giấy nhỏ.
  + *Bước 3 (Báo cáo):* HS phát biểu: Sau khi hút hết khí, mẩu giấy và viên bi chì chạm đáy ống cùng một thời điểm!
  + *Bước 4 (Kết luận & Chốt ghi bài):* GV chuẩn hóa kiến thức và chiếu video clip phi hành gia thả búa và lông chim trên Mặt Trăng để củng cố:

> **[KIẾN THỨC TRỌNG TÂM GHI VỞ]:**
> 1. **Định nghĩa:** Sự rơi tự do là sự rơi của các vật chỉ chịu tác dụng của trọng lực.
> 2. **Điều kiện:** Nếu vật rơi trong không khí mà độ lớn lực cản không khí rất nhỏ so với trọng lực ($F_c \\ll P$) thì có thể coi gần đúng là sự rơi tự do.

---

#### Đơn vị kiến thức 2: Đặc điểm và các công thức của chuyển động rơi tự do (15 phút)
- **a. Mục tiêu:** Nêu được các đặc điểm: phương thẳng đứng, chiều từ trên xuống dưới, là chuyển động thẳng nhanh dần đều với vận tốc đầu $v_0 = 0$. Viết các công thức liên quan.
- **b. Nội dung:** Phân tích ảnh chụp hoạt nghiệm quả bóng rơi tự do; vận dụng công thức chuyển động thẳng biến đổi đều đã học ở bài trước.
- **c. Sản phẩm học sinh:** Viết chính xác các phương trình: $v = gt$, $s = \\frac{1}{2}gt^2$, $v^2 = 2gs$.
- **d. Tổ chức thực hiện:**
  + *Bước 1 (Chuyển giao):* GV chiếu ảnh hoạt nghiệm chụp quả cầu rơi sau những khoảng thời gian bằng nhau $\\Delta t = 0{,}05\\text{ s}$. Yêu cầu HS đo khoảng cách tăng dần giữa các vị trí liên tiếp.
  + *Bước 2 (Thực hiện):* HS làm việc theo nhóm 2 bạn, tính tỉ số các quãng đường rơi được sau những khoảng thời gian bằng nhau: $s_1 : s_2 : s_3 = 1 : 3 : 5$.
  + *Bước 3 (Báo cáo):* Đại diện nhóm khẳng định đây là đặc trưng của chuyển động thẳng nhanh dần đều.
  + *Bước 4 (Kết luận & Chốt ghi bài):*

> **[KIẾN THỨC TRỌNG TÂM GHI VỞ]:**
> - **Phương:** Thẳng đứng.
> - **Chiều:** Từ trên xuống dưới.
> - **Tính chất:** Chuyển động thẳng nhanh dần đều với vận tốc ban đầu $v_0 = 0$.
> - **Hệ thống công thức (chọn trục $Oy$ thẳng đứng hướng xuống, gốc $O$ tại vị trí thả):**
>   + Công thức tính vận tốc: $v = g \\cdot t$
>   + Công thức tính quãng đường / độ dịch chuyển: $s = \\frac{1}{2} g t^2$
>   + Hệ thức độc lập với thời gian: $v^2 = 2 g s \\Rightarrow v = \\sqrt{2 g s}$
>   + Thời gian rơi từ độ cao $h$: $t = \\sqrt{\\frac{2h}{g}}$
> - **Gia tốc rơi tự do ($g$):** Tại một nơi nhất định trên Trái Đất và ở gần mặt đất, các vật đều rơi tự do với cùng một gia tốc $g$. Thường lấy $g \\approx 9{,}8\\text{ m/s}^2$ hoặc $g \\approx 10\\text{ m/s}^2$. Càng lên cao và càng gần Xích đạo, $g$ càng giảm nhẹ.

---

#### Đơn vị kiến thức 3: Thực hành đo gia tốc rơi tự do bằng cổng quang điện (20 phút)
- **a. Mục tiêu:** Học sinh sử dụng bộ thí nghiệm đo thời gian rơi trên các quãng đường $s$ khác nhau, tính giá trị trung bình $\\overline{g}$ và sai số.
- **b. Nội dung:** Thực hiện đo theo Phiếu học tập số 02.
- **c. Sản phẩm học sinh:** Bảng số liệu hoàn chỉnh, tính ra kết quả $g = \\overline{g} \\pm \\Delta g$.
- **d. Tổ chức thực hiện:**
  + *Bước 1 (Chuyển giao):* GV hướng dẫn cách đấu nối cổng quang vào đồng hồ đo thời gian (chế độ MODE $A \\leftrightarrow B$), cố định khoảng cách $s = 0{,}400\\text{ m}; 0{,}600\\text{ m}; 0{,}800\\text{ m}$.
  + *Bước 2 (Thực hiện):* 6 nhóm tiến hành đo lặp lại 3 lần cho mỗi độ cao, ghi số liệu vào Phiếu học tập số 02.
  + *Bước 3 (Báo cáo):* Đại diện 2 nhóm lên bảng ghi kết quả tính toán: $\\overline{g} \\approx 9{,}78\\text{ m/s}^2$.
  + *Bước 4 (Kết luận):* GV đánh giá thao tác kỹ thuật, lưu ý các nguyên nhân gây sai số (cổng quang bị rung, bi thép cọ sát nhẹ vào vành cổng).

---

### Hoạt động 3: Luyện tập (18 phút)
- **a. Mục tiêu:** Củng cố kiến thức, phân hóa học sinh theo 3 định dạng đề thi tốt nghiệp THPT từ năm 2025.
- **b. Nội dung:** Bộ câu hỏi trắc nghiệm chuẩn format mới.

#### PHẦN I: Câu trắc nghiệm nhiều phương án lựa chọn (Chọn 1 đáp án đúng)
**Câu 1:** Một vật rơi tự do từ độ cao $h$ xuống đất tại nơi có gia tốc trọng trường $g$. Vận tốc của vật lúc vừa chạm đất được tính bởi công thức:
A. $v = 2gh$.
B. $v = \\sqrt{\\frac{2h}{g}}$.
C. $v = \\sqrt{2gh}$. *(Đáp án đúng)*
D. $v = \\sqrt{gh}$.
*Lời giải:* Áp dụng công thức độc lập thời gian $v^2 - v_0^2 = 2gs$, với $v_0 = 0$ và $s = h$, suy ra $v = \\sqrt{2gh}$. Chọn C.

---

#### PHẦN II: Câu trắc nghiệm Đúng/Sai (Mỗi câu gồm 4 ý a, b, c, d)
**Câu 2:** Một học sinh thả một viên bi thép nhỏ rơi tự do từ tầng thượng của một tòa nhà cao tầng xuống mặt đất. Lấy $g = 9{,}8\\text{ m/s}^2$. Bỏ qua sức cản của không khí. Biết rằng viên bi chạm đất sau thời gian $t = 3{,}0\\text{ s}$. Xét tính Đúng/Sai của các phát biểu sau:
- **a)** Chuyển động của viên bi là chuyển động thẳng nhanh dần đều với gia tốc có độ lớn $9{,}8\\text{ m/s}^2$. $\\rightarrow$ **ĐÚNG** *(Do là sự rơi tự do).*
- **b)** Độ cao của tầng thượng tòa nhà so với mặt đất là $h = 44{,}1\\text{ m}$. $\\rightarrow$ **ĐÚNG** *(Tính bằng $h = \\frac{1}{2}gt^2 = 0{,}5 \\times 9{,}8 \\times 3^2 = 44{,}1\\text{ m}$).*
- **c)** Vận tốc của viên bi ngay trước khi chạm đất là $v = 29{,}4\\text{ m/s}$. $\\rightarrow$ **ĐÚNG** *(Tính bằng $v = gt = 9{,}8 \\times 3 = 29{,}4\\text{ m/s}$).*
- **d)** Quãng đường viên bi rơi được trong giây thứ ba (từ $t = 2\\text{ s}$ đến $t = 3\\text{ s}$) bằng quãng đường rơi được trong 2 giây đầu tiên. $\\rightarrow$ **SAI** *(Quãng đường trong 2 giây đầu: $s_2 = 0{,}5 \\times 9{,}8 \\times 4 = 19{,}6\\text{ m}$. Quãng đường trong giây thứ 3: $\\Delta s_3 = s_3 - s_2 = 44{,}1 - 19{,}6 = 24{,}5\\text{ m} \\ne 19{,}6\\text{ m}$).*

---

#### PHẦN III: Câu trắc nghiệm trả lời ngắn (Điền số kèm đơn vị)
**Câu 3:** Một hòn đá được thả rơi tự do từ miệng giếng sâu. Sau $2{,}0\\text{ s}$ kể từ lúc buông tay, người thả nghe thấy tiếng hòn đá chạm đáy giếng vọng lên. Lấy $g = 10\\text{ m/s}^2$ và tốc độ truyền âm trong không khí là $v_{am} = 340\\text{ m/s}$. Tính độ sâu của giếng theo đơn vị mét (m), làm tròn kết quả đến một chữ số thập phân sau dấu phẩy.
*Đáp số:* **$18{,}9$**
*Lời giải chi tiết:*
Gọi độ sâu của giếng là $h$ (m).
Thời gian rơi tự do của hòn đá: $t_1 = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2h}{10}} = \\sqrt{0{,}2h}$.
Thời gian âm thanh truyền từ đáy giếng lên miệng giếng: $t_2 = \\frac{h}{v_{am}} = \\frac{h}{340}$.
Tổng thời gian: $t_1 + t_2 = 2{,}0 \\Leftrightarrow \\sqrt{0{,}2h} + \\frac{h}{340} = 2$.
Đặt $u = \\sqrt{h} \\ge 0 \\Rightarrow \\frac{1}{340}u^2 + \\sqrt{0{,}2}u - 2 = 0$.
Giải phương trình bậc hai tìm được $u \\approx 4{,}347 \\Rightarrow h = u^2 \\approx 18{,}9\\text{ m}$.

---

### Hoạt động 4: Vận dụng - Dự án STEM mini (14 phút hoặc Giao về nhà)
- **a. Mục tiêu:** Chế tạo "Thước đo thời gian phản xạ của người" dựa trên định luật rơi tự do.
- **b. Nội dung nhiệm vụ:**
  + Dùng một chiếc thước kẻ dài $30\\text{ cm}$ hoặc $50\\text{ cm}$.
  + Áp dụng công thức $t = \\sqrt{\\frac{2s}{g}}$, tính các khoảng cách $s$ tương ứng với thời gian phản xạ $0{,}05\\text{ s}; 0{,}10\\text{ s}; 0{,}15\\text{ s}; 0{,}20\\text{ s}; 0{,}25\\text{ s}$.
  + Chia vạch thời gian trực tiếp lên thân thước.
  + Thực hành đo thời gian phản xạ giữa các bạn trong gia đình/nhóm bạn.
- **c. Sản phẩm:** Chiếc thước đo thời gian phản xạ hoàn chỉnh và phiếu báo cáo số liệu thời gian phản xạ của 5 người thân.
- **d. Đánh giá (Rubric):** Tính chính xác của thang chia (40%), thẩm mỹ & độ bền của thước (30%), bài báo cáo phân tích kết quả đo (30%).

---

## IV. PHỤ LỤC: PHIẾU HỌC TẬP

### PHIẾU HỌC TẬP SỐ 01: KHẢO SÁT SỰ RƠI CỦA CÁC VẬT
**Trường THPT:** ...................................... | **Lớp:** 10... | **Nhóm:** ......
**Họ tên các thành viên:**
1. ..................................................... 2. .....................................................
3. ..................................................... 4. .....................................................

**1. Thí nghiệm khởi động:**
- Quan sát tờ giấy phẳng và tờ giấy vo tròn khi rơi: Tờ nào chạm đất trước? Vì sao?
  *Trả lời:* .............................................................................................................................
- Hai tờ giấy có khối lượng bằng nhau không? Yếu tố nào gây ra sự chênh lệch thời gian rơi?
  *Trả lời:* .............................................................................................................................

**2. Thí nghiệm ống Newton:**
- Khi trong ống có không khí: Viên bi chì rơi ......................... mẩu giấy xốp.
- Khi đã hút chân không: Viên bi chì và mẩu giấy xốp rơi .....................................................
- *Kết luận:* Trong chân không, các vật có hình dạng và khối lượng khác nhau sẽ ...................

---

### PHIẾU HỌC TẬP SỐ 02: XÁC ĐỊNH GIA TỐC RƠI TỰ DO BẰNG CỔNG QUANG
**Mục đích:** Đo thời gian rơi $t$ ứng với quãng đường $s$, từ đó xác định gia tốc $g = \\frac{2s}{t^2}$.

**Bảng số liệu thực nghiệm:**

| Lần đo | Quãng đường $s = 0{,}400\\text{ m}$ | Quãng đường $s = 0{,}600\\text{ m}$ | Quãng đường $s = 0{,}800\\text{ m}$ |
| :---: | :---: | :---: | :---: |
| Lần 1 | $t_1 = .............\\text{ s}$ | $t_1 = .............\\text{ s}$ | $t_1 = .............\\text{ s}$ |
| Lần 2 | $t_2 = .............\\text{ s}$ | $t_2 = .............\\text{ s}$ | $t_2 = .............\\text{ s}$ |
| Lần 3 | $t_3 = .............\\text{ s}$ | $t_3 = .............\\text{ s}$ | $t_3 = .............\\text{ s}$ |
| **Giá trị trung bình** | $\\overline{t} = .............\\text{ s}$ | $\\overline{t} = .............\\text{ s}$ | $\\overline{t} = .............\\text{ s}$ |
| **Tính gia tốc $g = \\frac{2s}{\\overline{t}^2}$** | $g_1 = .............\\text{ m/s}^2$ | $g_2 = .............\\text{ m/s}^2$ | $g_3 = .............\\text{ m/s}^2$ |

- **Gia tốc trung bình:** $\\overline{g} = \\frac{g_1 + g_2 + g_3}{3} = .........................\\text{ m/s}^2$
- **Nhận xét so với giá trị chuẩn $g = 9{,}8\\text{ m/s}^2$ và giải thích nguyên nhân sai số:**
  ...........................................................................................................................................................
`,
  },
  {
    id: 'sample-lop11-dao-dong-dieu-hoa',
    title: 'MÔ TẢ DAO ĐỘNG VÀ DAO ĐỘNG ĐIỀU HÒA',
    grade: '11',
    textbook: 'Cánh diều',
    duration: '3 tiết (135 phút)',
    customFocus: 'Khảo sát đồ thị li độ - thời gian, phân tích pha dao động và mối liên hệ giữa x, v, a',
    teacherName: 'Trần Thị Mai',
    schoolName: 'Trường THPT Chuyên / THPT Đạt Chuẩn',
    createdAt: '2026-09-20T09:30:00.000Z',
    updatedAt: '2026-09-20T09:30:00.000Z',
    isSample: true,
    content: `# KẾ HOẠCH BÀI DẠY: MÔ TẢ DAO ĐỘNG VÀ DAO ĐỘNG ĐIỀU HÒA
**Môn:** Vật lí - **Lớp:** 11 | **Bộ sách:** Cánh diều
**Thời lượng:** 3 tiết (135 phút)

---

## I. MỤC TIÊU BÀI HỌC

### 1. Về năng lực
- **Năng lực Vật lí:**
  + *Năng lực nhận thức vật lí:*
    * Phát biểu được định nghĩa dao động, dao động tuần hoàn, dao động điều hòa.
    * Nêu được ý nghĩa của các đại lượng đặc trưng: li độ $x$, biên độ $A$, chu kì $T$, tần số $f$, tần số góc $\\omega$, pha dao động $(\\omega t + \\varphi)$, pha ban đầu $\\varphi$.
    * Viết được phương trình li độ $x = A \\cos(\\omega t + \\varphi)$, phương trình vận tốc $v = -\\omega A \\sin(\\omega t + \\varphi)$, phương trình gia tốc $a = -\\omega^2 x$.
    * Phân tích được đồ thị li độ - thời gian dạng hình sin; xác định được mối quan hệ về pha giữa li độ, vận tốc và gia tốc ($v$ sớm pha $\\frac{\\pi}{2}$ so với $x$, $a$ ngược pha so với $x$).
  + *Năng lực tìm hiểu tự nhiên dưới góc độ vật lí:*
    * Quan sát thí nghiệm vết dao động con lắc cát hoặc khai thác cảm biến chuyển động siêu âm để thu thập đồ thị $x - t$ trên máy vi tính.
    * Đọc và giải mã các thông số $A, T, \\varphi$ trực tiếp từ đồ thị dao động thực nghiệm.
  + *Năng lực vận dụng kiến thức, kĩ năng đã học:*
    * Giải thích được các hiện tượng dao động trong thực tế (quả lắc đồng hồ, cành cây đu đưa trong gió, màng loa rung).
    * Giải được các bài tập định lượng và câu hỏi trắc nghiệm đúng/sai, trả lời ngắn chuẩn cấu trúc thi tốt nghiệp THPT từ năm 2025.
- **Năng lực chung:**
  + *Tự chủ và tự học:* Tự làm việc với các phần mềm đồ thị hoặc ứng dụng mô phỏng PhET "Masses and Springs".
  + *Giao tiếp và hợp tác:* Phân công nhiệm vụ nhóm khi phân tích đồ thị sóng và phản biện khoa học.

### 2. Về phẩm chất
- **Chăm chỉ:** Kiên trì đọc hiểu các biểu thức lượng giác và mối quan hệ đạo hàm vật lí.
- **Trung thực:** Ghi nhận chính xác giá trị biên độ và chu kì từ đồ thị thực nghiệm mà không phỏng đoán tùy tiện.

---

## II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
- **Giáo viên:** Máy tính, máy chiếu, mô hình con lắc lò xo và con lắc đơn, phần mềm mô phỏng dao động điều hòa GeoGebra / PhET.
- **Học sinh:** SGK Vật lí 11 (Cánh diều), compa, thước kẻ, máy tính cầm tay.
- **Phiếu học tập:** PHT 01 (Khảo sát đồ thị li độ $x-t$) và PHT 02 (Xây dựng mối liên hệ $x, v, a$).

---

## III. TIẾN TRÌNH DẠY HỌC (TÓM TẮT 4 HOẠT ĐỘNG CHUẨN 5512)

### Hoạt động 1: Khởi động (7 phút)
- **Mục tiêu:** Nhận diện chuyển động dao động khác với chuyển động thẳng hay tròn đều.
- **Tổ chức:** GV cho HS quan sát video nhịp tim đồ, chuyển động của dây đàn ghita sau khi gảy. Đặt câu hỏi: "Điểm chung của những chuyển động này là gì?" $\\rightarrow$ Dẫn dắt khái niệm dao động quanh vị trí cân bằng.

### Hoạt động 2: Hình thành kiến thức mới (70 phút)
- **ĐVKT 1: Khái niệm dao động cơ và dao động điều hòa:**
  + Định nghĩa: Dao động điều hòa là dao động trong đó li độ của vật là một hàm côsin (hoặc sin) của thời gian: $x = A\\cos(\\omega t + \\varphi)$.
  + Bảng các đại lượng:
    | Đại lượng | Ký hiệu | Đơn vị SI | Ý nghĩa vật lí |
    | :--- | :---: | :---: | :--- |
    | Li độ | $x$ | $\\text{m hoặc cm}$ | Độ lệch khỏi VTCB tại thời điểm $t$ |
    | Biên độ | $A$ | $\\text{m hoặc cm}$ | Độ lệch cực đại khỏi VTCB ($A > 0$) |
    | Chu kì | $T$ | $\\text{s}$ | Thời gian thực hiện 1 dao động toàn phần: $T = \\frac{2\\pi}{\\omega} = \\frac{1}{f}$ |
    | Tần số | $f$ | $\\text{Hz}$ | Số dao động trong 1 giây: $f = \\frac{1}{T} = \\frac{\\omega}{2\\pi}$ |
    | Tần số góc | $\\omega$ | $\\text{rad/s}$ | Tốc độ biến thiên của pha |
    | Pha ban đầu | $\\varphi$ | $\\text{rad}$ | Xác định trạng thái dao động ở thời điểm $t = 0$ |
- **ĐVKT 2: Vận tốc và gia tốc trong dao động điều hòa:**
  + Vận tốc: $v = x' = -\\omega A \\sin(\\omega t + \\varphi) = \\omega A \\cos\\left(\\omega t + \\varphi + \\frac{\\pi}{2}\\right)$
    * $v_{max} = \\omega A$ khi vật qua vị trí cân bằng theo chiều dương.
    * $v = 0$ khi vật ở hai vị trí biên.
  + Gia tốc: $a = v' = -\\omega^2 A \\cos(\\omega t + \\varphi) = -\\omega^2 x = \\omega^2 A \\cos(\\omega t + \\varphi + \\pi)$
    * $a_{max} = \\omega^2 A$ khi vật ở biên âm ($x = -A$).
    * Vectơ gia tốc luôn hướng về vị trí cân bằng và có độ lớn tỉ lệ với độ lớn li độ.
  + Hệ thức độc lập thời gian: $A^2 = x^2 + \\frac{v^2}{\\omega^2} = \\frac{a^2}{\\omega^4} + \\frac{v^2}{\\omega^2}$.

### Hoạt động 3: Luyện tập (38 phút)
- **Hệ thống câu hỏi theo định dạng đề thi 2025 mới:**
  + **Phần I (Nhiều lựa chọn):**
    * Câu 1: Một chất điểm dao động điều hòa với phương trình $x = 6\\cos(4\\pi t + \\frac{\\pi}{3})\\text{ (cm)}$. Pha ban đầu của dao động là:
      A. $4\\pi\\text{ rad}$.  B. $6\\text{ cm}$.  C. $\\frac{\\pi}{3}\\text{ rad}$. *(Đúng)*  D. $-\\frac{\\pi}{3}\\text{ rad}$.
  + **Phần II (Trắc nghiệm Đúng/Sai):**
    * Câu 2: Một vật nhỏ khối lượng $m = 200\\text{ g}$ dao động điều hòa trên trục $Ox$. Đồ thị li độ - thời gian là một đường hình sin có biên độ $A = 5\\text{ cm}$ và chu kì $T = 0{,}4\\text{ s}$. Lấy $\\pi^2 = 10$.
      - a) Tần số góc của dao động là $\\omega = 5\\pi\\text{ rad/s}$. $\\rightarrow$ **ĐÚNG** ($2\\pi / 0{,}4 = 5\\pi$).
      - b) Tốc độ cực đại của vật trong quá trình dao động là $v_{max} = 25\\pi\\text{ cm/s} \\approx 78{,}5\\text{ cm/s}$. $\\rightarrow$ **ĐÚNG** ($v_{max} = \\omega A = 5\\pi \\times 5$).
      - c) Gia tốc của vật có độ lớn cực đại là $a_{max} = 12{,}5\\text{ m/s}^2$. $\\rightarrow$ **ĐÚNG** ($a_{max} = \\omega^2 A = (25 \\times 10) \\times 0{,}05 = 12{,}5\\text{ m/s}^2$).
      - d) Khi vật qua vị trí có li độ $x = 2{,}5\\text{ cm}$ thì độ lớn vận tốc của nó bằng một nửa vận tốc cực đại. $\\rightarrow$ **SAI** (Tại $x = \\frac{A}{2} \\Rightarrow |v| = \\frac{\\sqrt{3}}{2}v_{max} \\approx 0{,}866 v_{max} \\ne 0{,}5 v_{max}$).
  + **Phần III (Trả lời ngắn):**
    * Câu 3: Một vật dao động điều hòa với biên độ $A = 10\\text{ cm}$. Khi vật có li độ $x = 6\\text{ cm}$ thì tốc độ của vật là $32\\text{ cm/s}$. Tính chu kì dao động của vật theo đơn vị giây (s), làm tròn đến hai chữ số thập phân.
      *Đáp số:* **$1{,}57$** (Lời giải: $\\omega = \\frac{v}{\\sqrt{A^2 - x^2}} = \\frac{32}{\\sqrt{10^2 - 6^2}} = 4\\text{ rad/s} \\Rightarrow T = \\frac{2\\pi}{\\omega} = \\frac{\\pi}{2} \\approx 1{,}57\\text{ s}$).

### Hoạt động 4: Vận dụng (20 phút / Giao về nhà)
- **Nhiệm vụ:** Tìm hiểu ứng dụng giảm chấn của con lắc phản xạ dao động khối lượng điều chỉnh (TMD - Tuned Mass Damper) được đặt trên đỉnh tòa tháp Taipei 101 để chống bão và động đất. Viết bài báo cáo ngắn 1 trang kèm hình vẽ sơ đồ nguyên lí.
`,
  },
  {
    id: 'sample-lop12-mo-hinh-dong-hoc-khi',
    title: 'MÔ HÌNH ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ VÀ CẤU TRÚC CHẤT',
    grade: '12',
    textbook: 'Chân trời sáng tạo',
    duration: '2 tiết (90 phút)',
    customFocus: 'Khảo sát cấu trúc chất rắn - lỏng - khí, phân tích chuyển động Brown và giải thích áp suất chất khí',
    teacherName: 'Lê Hoàng Nam',
    schoolName: 'Trường THPT Đạt Chuẩn Quốc Gia',
    createdAt: '2026-09-20T10:15:00.000Z',
    updatedAt: '2026-09-20T10:15:00.000Z',
    isSample: true,
    content: `# KẾ HOẠCH BÀI DẠY: MÔ HÌNH ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ
**Môn:** Vật lí - **Lớp:** 12 | **Bộ sách:** Chân trời sáng tạo
**Thời lượng:** 2 tiết (90 phút)

---

## I. MỤC TIÊU BÀI HỌC

### 1. Về năng lực
- **Năng lực nhận thức vật lí:**
  + Trình bày được cấu trúc thể rắn, lỏng, khí dưới góc độ mô hình vi mô (khoảng cách phân tử, lực tương tác, dạng chuyển động).
  + Nêu được các nội dung cơ bản của thuyết động học phân tử chất khí.
  + Giải thích được nguyên nhân gây ra áp suất của chất khí lên thành bình chứa: do vô số phân tử khí chuyển động hỗn loạn không ngừng va chạm vào thành bình.
  + Nêu được khái niệm khí lí tưởng: các phân tử coi như chất điểm và chỉ tương tác với nhau khi va chạm.
- **Năng lực tìm hiểu tự nhiên dưới góc độ vật lí:**
  + Mô tả và giải thích được thí nghiệm chuyển động Brown qua kính hiển vi (hoặc video mô phỏng).
  + Khai thác phần mềm mô phỏng khí lí tưởng PhET "Gas Properties" để quan sát mối quan hệ giữa số va chạm, nhiệt độ và áp suất.
- **Năng lực vận dụng:**
  + Giải thích các hiện tượng thực tế: tại sao lốp xe để ngoài trời nắng dễ bị nổ; tại sao mùi nước hoa khuếch tán trong phòng kín.

### 2. Về phẩm chất
- Trung thực, cẩn thận, có ý thức vận dụng kiến thức vật lí nhiệt để bảo vệ an toàn cháy nổ bình gas trong gia đình.

---

## II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
- **Giáo viên:** Mô phỏng tương tác PhET Interactive Simulations (States of Matter / Gas Properties), video chuyển động Brown của hạt phấn hoa trong nước, bơm tiêm y tế có bịt đầu đo áp suất.
- **Học sinh:** SGK Vật lí 12 (Chân trời sáng tạo), giấy A4 làm việc nhóm.

---

## III. TIẾN TRÌNH DẠY HỌC THEO 4 BƯỚC CHUẨN 5512

### Hoạt động 1: Mở đầu (8 phút)
- **Tình huống:** GV cầm quả bóng bay được bơm căng, sau đó ấn nhẹ và hỏi: "Tại sao quả bóng lại căng tròn mọi phía? Cái gì đã đẩy màng cao su căng ra như vậy?" $\\rightarrow$ Đặt vấn đề nghiên cứu cấu trúc phân tử và áp suất chất khí.

### Hoạt động 2: Hình thành kiến thức mới (50 phút)
- **ĐVKT 1: Cấu trúc của chất rắn, chất lỏng và chất khí:**
  + Bảng so sánh 3 thể của vật chất:
    | Tiêu chí | Thể rắn | Thể lỏng | Thể khí |
    | :--- | :--- | :--- | :--- |
    | Khoảng cách phân tử | Rất gần nhau (cỡ kích thước phân tử) | Xa hơn thể rắn | Rất xa nhau (gấp hàng chục lần kích thước phân tử) |
    | Lực tương tác | Rất mạnh, giữ các phân tử ở vị trí cố định | Khá mạnh, yếu hơn thể rắn | Rất yếu (coi như không đáng kể khi không va chạm) |
    | Chuyển động phân tử | Dao động quanh vị trí cân bằng cố định | Dao động quanh VTCB tạm thời rồi nhảy vị trí | Chuyển động hỗn loạn không ngừng về mọi hướng |
    | Hình dạng & Thể tích | Thể tích và hình dạng xác định | Thể tích xác định, hình dạng phụ thuộc bình chứa | Không có thể tích và hình dạng riêng, chiếm toàn bộ bình chứa |

- **ĐVKT 2: Nội dung thuyết động học phân tử chất khí và Khí lí tưởng:**
  > **[KIẾN THỨC TRỌNG TÂM GHI VỞ]:**
  > 1. Chất khí được cấu tạo từ các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng.
  > 2. Các phân tử khí chuyển động hỗn loạn, không ngừng; chuyển động này càng nhanh thì nhiệt độ của chất khí càng cao.
  > 3. Khi chuyển động hỗn loạn, các phân tử va chạm vào nhau và va chạm vào thành bình chứa, gây ra áp suất lên thành bình.
  > 4. **Khí lí tưởng:** Là chất khí trong đó các phân tử được coi là các chất điểm và chỉ tương tác với nhau khi va chạm.

### Hoạt động 3: Luyện tập (20 phút) - Chuẩn format 2025
- **Phần I (Nhiều lựa chọn):**
  * Câu 1: Theo thuyết động học phân tử chất khí, áp suất của chất khí tác dụng lên thành bình chứa là do:
    A. Lực hút tĩnh điện giữa các phân tử khí.
    B. Sự va chạm của các phân tử khí vào thành bình. *(Đúng)*
    C. Trọng lực của khối khí đè lên đáy bình.
    D. Thể tích của các phân tử khí chiếm chỗ.
- **Phần II (Đúng/Sai):**
  * Câu 2: Khi nung nóng một khối khí chứa trong một bình kín có thể tích không đổi:
    - a) Khối lượng của khối khí tăng lên. $\\rightarrow$ **SAI** (Khối lượng bảo toàn).
    - b) Vận tốc chuyển động nhiệt trung bình của các phân tử khí tăng lên. $\\rightarrow$ **ĐÚNG** (Nhiệt độ tỉ lệ với động năng nhiệt).
    - c) Số va chạm của các phân tử khí vào một đơn vị diện tích thành bình trong một đơn vị thời gian tăng lên. $\\rightarrow$ **ĐÚNG**.
    - d) Áp suất chất khí tác dụng lên thành bình giảm đi. $\\rightarrow$ **SAI** (Áp suất tăng tỉ lệ thuận với nhiệt độ tuyệt đối).
- **Phần III (Trả lời ngắn):**
  * Câu 3: Một bình kín chứa $N = 3{,}01 \\times 10^{23}$ phân tử khí lí tưởng ở điều kiện tiêu chuẩn. Khối khí này tương ứng với bao nhiêu mol chất khí? (Lấy số Avogadro $N_A = 6{,}02 \\times 10^{23}\\text{ mol}^{-1}$).
    *Đáp số:* **$0{,}5$** (Lời giải: $n = \\frac{N}{N_A} = \\frac{3{,}01 \\times 10^{23}}{6{,}02 \\times 10^{23}} = 0{,}5\\text{ mol}$).

### Hoạt động 4: Vận dụng (12 phút)
- **Nhiệm vụ:** Tìm hiểu quy chuẩn an toàn khi sử dụng bình gas mini và bình cứu hỏa khí $\\text{CO}_2$. Tại sao không được để các bình khí này gần nguồn nhiệt hoặc dưới ánh nắng trực tiếp?
`,
  },
];

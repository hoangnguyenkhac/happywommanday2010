export interface PetalItem {
  id: string;
  title: string;
  subtitle: string;
  message: string;
  color?: string;
}

export interface MemoryItem {
  id: string;
  image: string;
  title: string;
  date: string;
  location?: string;
  caption: string;
}

export interface LetterContent {
  greeting: string;
  paragraphs: string[];
  signature: string;
  postScript?: string;
}

export interface OccasionInfo {
  label: string;
  date: string;
  subDate: string;
  title: string;
  quote: string;
}

export interface GiftConfig {
  recipient: string;
  recipientNickname: string;
  sender: string;
  occasion: OccasionInfo;
  openingMessage: string;
  petals: PetalItem[];
  memories: MemoryItem[];
  letter: LetterContent;
  grandReveal: {
    highlightNumber: string;
    occasionTitle: string;
    subHeader: string;
    mainQuote: string;
  };
  wishes: {
    prompt: string;
    subPrompt: string;
    placeholder: string;
    quickWishes: string[];
    replyMessage: string;
  };
  finalMessage: {
    quote: string;
    subQuote: string;
    actionReplay: string;
  };
}

export const giftConfig: GiftConfig = {
  recipient: "Bé Liễu",
  recipientNickname: "Bé Liễu",
  sender: "Anh",
  occasion: {
    label: "20 THÁNG 10",
    date: "20.10",
    subDate: "Ngày Phụ Nữ Việt Nam",
    title: "Một món quà nhỏ dành riêng cho em",
    quote: "Gửi đến cô gái đáng yêu đã bước vào cuộc sống của anh và khiến mỗi ngày trôi qua đều ngập tràn niềm vui."
  },
  openingMessage: "Bé Liễu ơi… dù thời gian chúng mình quen nhau chưa dài, nhưng hôm nay Anh có một điều đặc biệt muốn dành riêng cho em.",
  petals: [
    {
      id: "petal-1",
      title: "Nụ cười của em mỗi ngày",
      subtitle: "Điều khiến tim Anh rung rinh",
      message: "Dù mới chỉ quen nhau một thời gian ngắn, nhưng mỗi lần thấy nụ cười hay nghe giọng nói của Bé Liễu là tự nhiên bao nhiêu mệt mỏi trong ngày của anh đều tan biến. Em có một sự đáng yêu và ấm áp khiến anh không thể rời mắt."
    },
    {
      id: "petal-2",
      title: "Cứ ngỡ quen từ kiếp nào",
      subtitle: "Đồng điệu đến từng câu chữ",
      message: "Thời gian quen nhau tuy chưa lâu, nhưng sao từng câu chuyện em chia sẻ, từng lời trêu đùa hay mẩu chuyện thường ngày... anh đều thấy thân thuộc và hợp cạ đến lạ kỳ. Cứ như thể chúng mình sinh ra là để gặp nhau vậy."
    },
    {
      id: "petal-3",
      title: "Lời chúc 20/10 siêu ngọt ngào",
      subtitle: "Dành cho cô gái anh đang để ý",
      message: "Chúc cô gái đáng yêu nhất quả đất của anh một ngày 20/10 ngập tràn niềm vui! Mong em luôn rạng rỡ, xinh đẹp, ăn ngon ngủ ngon và... cho anh thêm thật nhiều cơ hội để chăm sóc, chiều chuộng em nhé!"
    },
    {
      id: "petal-4",
      title: "Một chút 'bật đèn xanh'",
      subtitle: "Nghiêm túc tán tỉnh em đó",
      message: "Gặp được em là điều may mắn nhất của anh dạo gần đây. Dù mới đồng hành cùng nhau một đoạn đường ngắn, nhưng anh thật lòng hy vọng chặng đường sắp tới sẽ luôn có em bên cạnh. Em có đồng ý để anh chăm sóc em dài lâu không?"
    }
  ],
  memories: [
    {
      id: "memory-1",
      image: "/images/memories/photo-02.jpg",
      title: "Tin Nhắn Quan Tâm Mỗi Ngày",
      date: "Thói quen ngọt ngào",
      location: "Những dòng tin đong đầy yêu thương",
      caption: "Mỗi ngày trôi qua, niềm vui giản dị nhất của anh là được trao nhau những dòng tin nhắn quan tâm ân cần. Hỏi han em từng bữa ăn, nhắc em giữ ấm... từng mẩu chuyện vụn vặt sẻ chia cùng em đều khiến anh thấy lòng mình ấm áp lạ kỳ."
    },
    {
      id: "memory-2",
      image: "/images/memories/photo-01.jpg",
      title: "Vẽ Nên Những Chuyến Đi Chơi",
      date: "Những dự định tương lai",
      location: "Những miền đất mơ ước cùng em",
      caption: "Anh rất thích những lúc hai đứa cùng nhau tận hưởng và vẽ lên bao câu chuyện về những chuyến đi chơi xa, những bãi biển hoàng hôn muốn cùng em đặt chân tới. Dù chỉ là những dự định kể nhau nghe, nhưng anh luôn mong một ngày sẽ cùng em đi qua tất cả."
    },
    {
      id: "memory-3",
      image: "/images/memories/photo-03.jpg",
      title: "Những Lần Hẹn Gặp Hoài Niệm",
      date: "Khoảnh khắc được thấy em",
      location: "Những buổi gặp gỡ đáng nhớ",
      caption: "Những lần được hẹn gặp em, được nhìn thấy nụ cười rạng rỡ của Bé Liễu ngoài đời... dù thời gian bên nhau chưa dài nhưng mỗi lần gặp lại để lại trong lòng anh thật nhiều nhung nhớ, bồi hồi và hoài niệm ngọt ngào."
    }
  ],
  letter: {
    greeting: "Gửi Bé Liễu của Anh,",
    paragraphs: [
      "Người ta thường bảo thời gian là thước đo của tình cảm, nhưng với anh, chỉ cần một thời gian ngắn bên em cũng đủ để anh nhận ra em đặc biệt đến nhường nào.",
      "Từng dòng tin nhắn quan tâm em gửi mỗi ngày, những câu chuyện về các chuyến đi chơi mà hai đứa cùng nhau vẽ nên, hay những lần hẹn gặp em... tất cả đều là những điều khiến anh thấy gần gũi, bồi hồi và hoài niệm nhất.",
      "20/10 này, anh tự tay chuẩn bị món quà nhỏ này để muốn nói với em rằng: Anh thật lòng muốn cùng em biến những chuyến đi trong câu chuyện thành hiện thực, và viết tiếp thật nhiều kỷ niệm đẹp đẽ phía trước.",
      "Chúc Bé Liễu luôn xinh đẹp, an yên và nở nụ cười thật tươi mỗi ngày. Và nhớ nhé... tim anh đã lỡ rung động vì em mất rồi!"
    ],
    signature: "Anh",
    postScript: "Thương em & luôn ở bên em."
  },
  grandReveal: {
    highlightNumber: "20.10",
    occasionTitle: "CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM",
    subHeader: "Dành riêng cho Bé Liễu đáng yêu nhất",
    mainQuote: "DÙ QUEN NHAU CHƯA LÂU, NHƯNG TÌNH CẢM ANH DÀNH CHO EM LÀ CHÂN THÀNH VÀ SÂU SẮC NHẤT."
  },
  wishes: {
    prompt: "Bầu Trời Điều Ước 20.10",
    subPrompt: "Bé Liễu hãy gửi một điều ước vào bầu trời đêm nay nhé. Anh luôn ở đây lắng nghe và đồng hành cùng em...",
    placeholder: "Nhập điều ước của em (hoặc ước được đi chơi cùng Anh nhiều hơn nhé)...",
    quickWishes: [
      "Mong chúng mình luôn vui vẻ và gắn bó bên nhau!",
      "Mong có thêm thật nhiều buổi hẹn hò lãng mạn cùng Anh!",
      "Chúc Bé Liễu luôn được Anh yêu thương và chiều chuộng!"
    ],
    replyMessage: "Mọi điều ước của Bé Liễu, Anh nguyện sẽ luôn đồng hành cùng em để biến thành hiện thực. 🌹✨"
  },
  finalMessage: {
    quote: "Bé Liễu à, cảm ơn em vì đã xuất hiện và khiến cuộc sống của anh trở nên rực rỡ và ngọt ngào đến thế. Dù thời gian quen nhau chưa dài, nhưng anh tin những điều tốt đẹp nhất của chúng mình chỉ mới vừa bắt đầu.",
    subQuote: "Always on my mind · Dành riêng cho Bé Liễu",
    actionReplay: "Xem Lại Món Quà"
  }
};

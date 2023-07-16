import React from 'react';
import background from '../asset/background2-1.jpg';

const About = () => {
  return (
    <div className=" items-center w-screen relative">
      <img
        src={background}
        alt="Landing Page"
        className="absolute -top-96 object-cover w-full -z-10 opacity-50"
      />
      <div className="m-60 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-20 mx-auto overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-20 text-indigo-900">
            Phòng khám Hong Phuong - Uy tín và chất lượng
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-indigo-800">
              Giới thiệu về phòng khám
            </h2>
            <p className="text-lg text-gray-800">
              Phòng khám Hong Phuong là một trong những phòng khám hàng đầu tại
              vịnh Bắc Bộ, với hơn 20 năm kinh nghiệm trong lĩnh vực y tế. Chúng
              tôi cam kết mang đến cho bệnh nhân những dịch vụ chăm sóc sức khỏe
              chất lượng cao, đáng tin cậy và hiệu quả.
            </p>
            <p className="text-lg text-gray-800">
              Với đội ngũ y bác sĩ giàu kinh nghiệm và tay nghề chuyên môn cao,
              chúng tôi luôn đặt lợi ích của bệnh nhân lên hàng đầu. Chúng tôi
              sử dụng công nghệ y tế tiên tiến và trang bị đầy đủ các thiết bị y
              tế hiện đại nhằm đảm bảo chẩn đoán chính xác và điều trị hiệu quả
              cho từng trường hợp.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-indigo-800">
              5 cơ sở lớn với đa dạng chuyên khoa
            </h2>
            <p className="text-lg text-gray-800">
              Hong Phuong hiện có 5 cơ sở phòng khám lớn đặt tại các địa điểm
              chiến lược trên vùng vịnh Bắc Bộ. Mỗi cơ sở được thiết kế hiện đại
              và trang bị đầy đủ các phòng khám, phòng xét nghiệm và phòng chụp
              X-quang. Chúng tôi tự hào mang đến cho bệnh nhân không chỉ không
              gian thoải mái, mà còn sự tiện nghi và sự an toàn trong quy trình
              chăm sóc.
            </p>
            <p className="text-lg text-gray-800">
              Với mục tiêu đáp ứng nhu cầu khám chữa bệnh đa dạng của mọi người,
              chúng tôi cung cấp nhiều chuyên khoa khác nhau tại các cơ sở của
              mình. Bạn có thể tìm thấy các chuyên khoa như tim mạch, hô hấp,
              nội tiết, tiêu hóa, da liễu, phụ khoa và nhiều chuyên khoa khác.
              Đội ngũ y bác sĩ chuyên môn và tận tâm của chúng tôi sẽ đồng hành
              cùng bạn trong quá trình khám và điều trị.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-indigo-800">
              Cam kết chất lượng
            </h2>
            <p className="text-lg text-gray-800">
              Tại phòng khám Hong Phuong, chúng tôi cam kết đảm bảo chất lượng
              dịch vụ y tế và sự hài lòng của bệnh nhân. Chúng tôi luôn tuân thủ
              các quy trình và tiêu chuẩn y tế chuyên ngành, đồng thời không
              ngừng nâng cao năng lực chuyên môn và đầu tư vào cơ sở vật chất để
              mang đến cho bạn trải nghiệm tốt nhất khi đến với chúng tôi.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-indigo-800">
              Hãy đến với phòng khám Hong Phuong
            </h2>
            <p className="text-lg text-gray-800">
              Với sứ mệnh chăm sóc sức khỏe và nâng cao chất lượng cuộc sống của
              cộng đồng, phòng khám Hong Phuong hy vọng được đồng hành và chăm
              sóc sức khỏe của bạn. Hãy đến với chúng tôi và trải nghiệm sự
              chuyên nghiệp, tận tâm và tinh thần phục vụ tốt nhất từ đội ngũ y
              bác sĩ và nhân viên y tế của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

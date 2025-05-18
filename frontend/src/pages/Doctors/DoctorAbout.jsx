/* eslint-disable no-unused-vars */
import { formatDate } from '../../utils/formatDate'

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                About Of
                <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                    Utkarsh
                </span>
            </h3>
            <p className="text__para">
                Dr. Utkarsh is a highly skilled and dedicated surgeon with extensive experience in both academic and clinical settings. He is committed to providing exceptional patient care and advancing medical knowledge through continuous learning and research. His expertise spans complex surgical procedures, and he is known for his compassionate approach and professionalism.
            </p>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Education
            </h3>
            <ul className='pt-4 md:p-5'>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                        {formatDate('06-04-2010')} - {formatDate('12-04-2017')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            PhD in Surgeon
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                            FMSo, Sousse.
                    </p>
                </li>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formatDate('12-04-2017')} - {formatDate('12-04-2028')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Internships
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                            Charles Nicol Hospital, Tunis.
                    </p>
                </li>
            </ul>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Experience
            </h3>
            <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                    {formatDate('12-04-2018')} - {formatDate('12-04-2020')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Surgeon Doctor
                    </p>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Fattouma Bourgiba, Monastir,
                    </p>
                </li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                    {formatDate('12-04-2020')} - {formatDate('12-04-2022')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Surgeon Doctor
                    </p>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Fattouma Bourgiba, Monastir,
                    </p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DoctorAbout
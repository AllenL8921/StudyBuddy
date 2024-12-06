import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function Team() {
    const members = [
        {
            name: "Allen Liu",
            role: "Fullstack Developer",
            photo: 'https://cdn.discordapp.com/attachments/1302078799688765500/1314682004843008010/20240629_112955.jpg?ex=6754a887&is=67535707&hm=3eebd4ffd882152568530adc32b6b9d82c1b730f1d547180647c13c9fc6dfed2&',
            linkedinUrl: "https://www.linkedin.com/in/allenxliu/",
            githubUrl: "https://github.com/AllenL8921",
            school: "College of Staten Island’ 25",
        },
        {
            name: "Shuyi Zhou",
            role: "Fullstack Developer",
            photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGP06EBJwe8Tw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725470310609?e=1738800000&v=beta&t=diTvPe4L0uOzzFkaqV4tZ7IqPIcow7YYBWJUiLqpwRE',
            linkedinUrl: "https://www.linkedin.com/in/shuyi-zhou-296ab6246/",
            githubUrl: "https://github.com/shuyi320",
            school: "Brooklyn College’ 25",
        }
    ]

    return (
        <section className='py-20 px-10 rounded w-full '>
            <ul className="pt-16 flex gap-20 ">
                {members.map((member, index) => {
                return (
                    <div className="flex text-center justify-center items-center flex-col gap-4 w-full " key={index}>
                        <img
                            src={member.photo}
                            alt={member.name}
                            className="w-72 flex h-72 rounded-full"
                        />
                        <div className="flex gap-1 flex-col">
                            <span className="font-poppins dark:text-white text-darkMaroon text-xl font-semibold text-primary">
                                {member.name}
                            </span>
                            <span className="font-poppins text-base dark:text-gray-300 text-gray-500">
                                {member.school}
                            </span>
                            <span className="font-poppins text-base dark:text-gray-300 text-gray-500">
                                {member.role}
                            </span>
                            <ul className="flex justify-center gap-2 pt-1">
                                <a href={member.githubUrl}>
                                    <FaGithub />
                                </a>
                                <a href={member.linkedinUrl}>
                                    <FaLinkedin />
                                </a>
                            </ul>
                        </div>
                    </div>
          );})}
            </ul>
        </section>
    )
}
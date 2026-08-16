import { teamMembers } from '../-data'
import { SectionHeading } from './SectionHeading'

/** Two-member team section. */
export function TeamSection() {
  return (
    <section className="mb-[2%] w-full bg-black">
      <SectionHeading>Team</SectionHeading>
      <div className="flex w-full flex-col gap-8 px-[10%] md:flex-row md:gap-[10%]">
        {teamMembers.map((member) => (
          <div className="w-full text-center md:w-1/2" key={member.name}>
            <img alt={member.name} className="w-full" src={member.image} />
            <div className="text-[29px] font-semibold">{member.name}</div>
            <div className="text-[27px] font-normal">{member.role}</div>
            <a href={member.link} rel="noreferrer" target="_blank">
              <img
                alt={member.iconAlt}
                className="mx-auto mt-[15px]"
                src={member.icon}
                width={50}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

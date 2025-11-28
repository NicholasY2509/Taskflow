import { User } from "./user";

export interface Team {
    id: number;
    name: string;
    description: string;
    projectCount: number;
    memberCount: number;
    members?: TeamMember[]
}

export interface TeamMember {
    id: number;
    userId: string;
    user: User
    teamId: string;
    team: Team;
    role: Role;
}

enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    STAFF = "STAFF",
    CLIENT = "CLIENT"
}
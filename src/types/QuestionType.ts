import { AgeGroupType } from "./AgeGroupType";
import { CategoryType } from "./CategoryType";
import { ID } from "./IdType";

export type QuestionType = {
    id: string;
    sno: string;
    ageGroup: AgeGroupType;
    questionEnglish: string;
    questionMalayalam: string;
    severity: number;
    category: CategoryType;
};

export type QuestionPostType = {
    id: string;
    ageGroup: {
        id: ID;
    };
    questionEnglish: string;
    questionMalayalam: string;
    severity: number;
    category: {
        id: ID
    };
}
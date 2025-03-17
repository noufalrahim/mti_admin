import { AgeGroupType } from "./AgeGroupType";
import { CategoryType } from "./CategoryType";

export type QuestionType = {
    id?: string;
    sno?: string;
    ageGroup: AgeGroupType;
    questionEnglish: string;
    questionMalayalam: string;
    severity: number;
    category: CategoryType;
};
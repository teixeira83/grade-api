import { IsString } from "class-validator";

export class CreateCourseDto {
    
    @IsString()

    private readonly name: string


    private readonly weekDays: string
}

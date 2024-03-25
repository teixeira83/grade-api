import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Course } from './schemas/course.schema'
import { CourseDTO } from './dto/list-course.dto'
import { NotFoundError } from 'rxjs'

@Controller('course')
@ApiTags('Course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto)
  }

  // @Post(':id/semester')
  // addSemester(@Param('id') courseId, @Body() createCourseDto: addSemersterToCourseDto) {
  //   return this.courseService.addSemester(courseId, createCourseDto)
  // }

  @Get()
  @ApiOkResponse({ type: CourseDTO})
  @ApiNotFoundResponse({
    content: {
      'application/json': {
        example: { error: 'Nenhum curso encontrado.' },
      },
    },
  })
  async findAll(): Promise<Course[]> {
    console.log('entrou no find all')
    const courses = await this.courseService.findAll() 
    if(courses.length===0){
      throw new NotFoundException('Nenhum curso encontrado.')
    }
    return courses
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.courseService.findOne(id)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id)
  }
}

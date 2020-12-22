import { ItemDto } from './../items/dto/item.dto';

import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Res,
    HttpStatus,
    Logger,
    HttpException,
    NotFoundException,
    Put,
    
  } from '@nestjs/common';
import { GridsService } from 'src/grids/grids.service';
import { Item } from 'src/items/interfaces/item.interface';
import { ItemsService } from 'src/items/items.service';
import { User } from 'src/users/interfaces/user.interface';
import { TemplateDto } from './dto/template.dto';
import { Template } from './interfaces/template.interface';
import { TemplatesService } from './templates.service';
@Controller('templates')
export class TemplatesController {

    constructor(private readonly templatesService: TemplatesService,private readonly gridService: GridsService,private readonly itemService:ItemsService) {}

    @Post('/add')
    async addTemplate(@Res() res, @Body('name') name: string,@Body('items') items:Item[],@Body('userId') userId:User) {
      Logger.log('Post rest api','TemplatesController')
      let result = [];
      console.log('ITEMS');
      console.log(items);
      
     for (let i = 0; i < items.length; i++) {
       console.log(items[i]);
       const itemslist = await this.itemService.insertItems(items[i].type,items[i].value,items[i].bold,
        items[i].italics,items[i].fontsize,items[i].x,items[i].y,items[i].h,items[i].w,items[i].widthimg,
        items[i].heightimg);
       result.push(itemslist)
     }
     
   
      const gridId = await this.gridService.insertGrid(result);
      const addedTemplate = await this.templatesService.insertTemplate(name,gridId,userId);
   
    
        if(addedTemplate)
        return res.status(HttpStatus.OK).json({
            message: 'Template has been submitted successfully!',
            template: addedTemplate,
        });
   
        throw new HttpException('Not created',HttpStatus.NOT_MODIFIED);
        
    }
   
 

   @Get('/all')
   async getAllTemplates(@Res() res) {
     Logger.log('Get all rest api ','TemplatesController')
     const templates = await this.templatesService.getTemplates();
     
     return res.status(HttpStatus.OK).json(templates);
   }
   @Get('/getBy/:tempID')
   async findById(@Res() res, @Param('tempID') tempID: string) {
     Logger.log('getById rest api','TemplatesController')
   const templates = await this.templatesService.findById(tempID);
   
   return res.status(HttpStatus.OK).json(templates);
    }

    @Get('/getByUser/:userID')
    async findByUserId(@Res() res, @Param('userID') userID: string) {
      Logger.log('getByUserId rest api','TemplatesController')
    const templates = await this.templatesService.findByUserId(userID);
    
    return res.status(HttpStatus.OK).json(templates);
     }
     @Get('/sortbyname/:userID')
     async sortByTemp(@Res() res, @Param('userID') userID: string) {
       Logger.log('getByUserId rest api','TemplatesController')
     const templates = await this.templatesService.SortByTempName(userID);
     
     return res.status(HttpStatus.OK).json(templates);
      }
      @Get('/sortasc/:userID')
      async sortAsc(@Res() res, @Param('userID') userID: string) {
        Logger.log('getByUserId rest api','TemplatesController')
      const templates = await this.templatesService.SortAsc(userID);
      
      return res.status(HttpStatus.OK).json(templates);
       }
       @Get('/sortdesc/:userID')
       async sortDesc(@Res() res, @Param('userID') userID: string) {
         Logger.log('getByUserId rest api','TemplatesController')
       const templates = await this.templatesService.SortDsc(userID);
       
       return res.status(HttpStatus.OK).json(templates);
        }
        @Get('/sortdesc/:userID')
        async sortDate(@Res() res, @Param('userID') userID: string) {
          Logger.log('getByUserId rest api','TemplatesController')
        const templates = await this.templatesService.SortDate(userID);
        
        return res.status(HttpStatus.OK).json(templates);
         }

      
@Delete('/delete/:id')
async deleteTemplate(@Res() res, @Param('id') id) {

 
  try {
    const deletedTemplate = await this.templatesService.deleteTemplate(id);

    return res.status(HttpStatus.OK).json({
      message: 'Template has been deleted!',
      post: deletedTemplate,
    });
    
  } catch (e) {

    return res.status(e.code >= 100 && e.code <= 600 ? e.code : 500)
      .json({
        error: true,
        message: e,
      });
  }
}
@Patch('/update')
updateProduct(
  @Body('id') id: string,
  @Body('name') name: string,@Body('items') items:Item[]
) {
  //this.templatesService.updateTemplate(id, name, items);
  return null;
}


@Get('/list/:page/:count')
      async listTemplateByP(@Res() res, @Param('page') page: string, @Param('count') count: string) {
        Logger.log('getByUserId rest api','TemplatesController')
      const templates = await this.templatesService.getPagesTemplate({},page,count);
      
      return res.status(HttpStatus.OK).json(templates);
       }
}
